import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink, MDBAlert } from 'mdbreact';
import { ServicesColumns, CategoriesToName, SubCategoriesToName } from '../../util/services';
import { SetServices } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { firestore } from '../../services/base';
const ServicesPage = (props) => {
  const limit = 25;
  function testClickEvent(param) {
    // console.log(param);
  }
  const { services, setServices } = props
  const [data, setData] = useState({ columns: ServicesColumns, rows: [] })
  const [error, setError] = useState('')
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
          avgRating: value.avgRating,
          numRating: value.numRating,
          time: `${value.StartTime}:00 - ${value.EndTime <= 23 ? value.EndTime : 0}:00`,
          _rating_: <MDBLink className="text-primary p-0" to={`/ratingsandcomments/service/${value.id}`}>View Ratings</MDBLink>,
          ServiceStatus: <MDBLink className="text-primary p-0" to='#'>{value.ServiceStatus}</MDBLink>,
          edit: <MDBLink className="text-primary p-0" to={`/edit_service/${value.id}`}>Edit</MDBLink>,
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
      <MDBCard>
        <MDBCardBody>
          <MDBDataTable responsive
            bordered
            entriesOptions={[10, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={data}
            materialSearch
          />
        </MDBCardBody>
      </MDBCard>
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
