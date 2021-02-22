import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBNavbarNav, MDBNavbar, MDBNavItem, MDBNavLink, MDBLink, MDBAlert, MDBIcon, MDBBtn } from 'mdbreact';
import { ServicesColumns, CategoriesToName, SubCategoriesToName } from '../../util/services';
import { SetServices } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { firestore, storage } from '../../services/base';
import Swal from 'sweetalert2'
const ServicesPage = (props) => {
  const limit = 25;
  function testClickEvent(param) {
    // console.log(param);
  }
  const { services, setServices } = props
  const [data, setData] = useState({ columns: ServicesColumns, rows: [] })
  const [error, setError] = useState('')

  const [activePage, setActivePage] = useState('all')

  useEffect(() => {
    setData({
      columns: data.columns,
      rows: services.map(value => {
        return {
          ProductName: value.ProductName,
          ServiceType: value.ServiceType,
          Category: CategoriesToName[value.Category],
          SubCategory: SubCategoriesToName[value.SubCategory],
          ProductImagesCount: value.ProductImagesCount,
          ProductDescription: value.ProductDescription,
          Pricing: value.Pricing,
          ContactNumber: value.ContactNumber,
          avgRating: value.avgRating.toFixed(2),
          numRating: value.numRating,
          time: `${value.StartTime}:00 - ${value.EndTime <= 23 ? value.EndTime : 0}:00`,
          _rating_: <MDBLink className="text-primary p-0" to={`/ratingsandcomments/service/${value.id}`}>View Ratings</MDBLink>,
          // ServiceStatus: <MDBLink className={value.ServiceStatus === "pending" ? "text-warning p-0" : "text-success p-0"} to='#'>{value.ServiceStatus}</MDBLink>,
          ServiceStatus: value.ServiceStatus,
          actions: <div><MDBLink className="text-primary d-inline mr-2 p-0" title="Edit" to={`/edit_service/${value.id}`}><MDBIcon fas icon="edit" /></MDBLink>
            <MDBLink to="#" className="text-danger d-inline p-0" title="Delete" onClick={(e) => handleDeleteService(e, value.id)}><MDBIcon fas icon="trash-alt" /></MDBLink></div>,
          clickEvent: row => testClickEvent(row)
        }
      })
    })
  }, [services])

  const fetchServices = function () {
    if (services.length > 0) {
      const lastService = services[services.length - 1]
      firestore
        .collection('Services')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .startAfter(lastService.id)
        .get()
        .then(querySnap => {
          setServices([
            ...services,
            ...querySnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          ])
        }).catch(err => {
          setError(err.message)
        })
    } else {
      firestore
        .collection('Services')
        .limit(limit)
        .get()
        .then(querySnap => {
          setServices(querySnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        }).catch(err => {
          setError(err.message)
        })
    }
  }

  const handleChangeActivePage = function (e, text) {
    e.preventDefault();
    setActivePage(text);
  }

  const handleDeleteService = function (event, id) {
    event.preventDefault()
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this service and all the reviews linked to it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        firestore.collection('Services').doc(id).delete().then(() => {
          firestore.collection('ServiceDetails').doc(id).delete().then(() => {
            Swal.fire({ title: 'Success', text: 'Service Deleted Successfully', icon: 'success' }).then((value) => {
              setServices(services.filter(x => x.id !== id));
            })
          }).catch(err => {
            Swal.fire({ title: 'Error', text: err.message, icon: 'error' }).then((value) => { })
          })
        }).catch(err => {
          Swal.fire({ title: 'Error', text: err.message, icon: 'error' }).then((value) => { })
        })
      }
    })
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <React.Fragment>
      <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">Services</h2>
        </MDBCardBody>
        {error && <MDBAlert color="danger">{error}</MDBAlert>}
      </MDBCard>
      <MDBNavbar color="white" light expand="xs" className="tabs-nav">
        <MDBNavbarNav left>
          <MDBNavItem active={activePage === "all"}>
            <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'all')}>All</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={activePage === "active"}>
            <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'active')}>Active</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={activePage === "pending"}>
            <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'pending')}>Pending</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={activePage === "inactive"}>
            <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'inactive')}>Inactive</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
      {activePage === "all" ?
        <MDBCard>
          <MDBCardBody>
            <MDBDataTable
              responsive
              bordered
              entriesOptions={[10, 20, 25]}
              entries={10}
              pagesAmount={4}
              data={data}
              materialSearch
              disableRetreatAfterSorting={true}
              onPageChange={value => {
                if (value.activePage === value.pagesAmount)
                  setTimeout(fetchServices(), 250);
              }}
            />
          </MDBCardBody>
        </MDBCard> :
        <MDBCard>
          <MDBCardBody>
            <MDBDataTable
              responsive
              bordered
              entriesOptions={[10, 20, 25]}
              entries={10}
              pagesAmount={4}
              data={{
                columns: data.columns,
                rows: data.rows.filter(row => row.ServiceStatus === activePage)
              }}
              materialSearch
              disableRetreatAfterSorting={true}
              onPageChange={value => {
                if (value.activePage === value.pagesAmount)
                  setTimeout(fetchServices(), 250);
              }}
            />
          </MDBCardBody>
        </MDBCard>
      }
    </React.Fragment>

  );
};
const mapStateToProps = state => {
  return {
    services: state.servicesReducer.services
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setServices: function (services) {
      dispatch(SetServices(services))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);
