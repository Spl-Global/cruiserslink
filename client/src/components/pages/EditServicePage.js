import React, { useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert } from 'mdbreact';
import { useHistory, useParams } from 'react-router-dom';
import { SetServices } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { CategoriesToName, SubCategoriesToName } from '../../util/services'
import { firestore } from '../../services/base';
import Swal from 'sweetalert2';
const EditServicePage = (props) => {
  const { id } = useParams()
  const history = useHistory();
  const { services, setServices } = props
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('danger');
  const [serviceData, setServiceData] = useState({})
  useEffect(() => {
    setLoading(true)
    services.forEach(service => {
      if (service.id === id) {
        setLoading(false)
        setServiceData(service)
      }
    })
    setLoading(false)
  }, [id])

  const handleChangeData = function (key, value) {
    setServiceData({
      ...serviceData,
      [key]: value
    });
    setError('')
  }

  const handleSubmitChanges = async function (event) {
    try {
      event.preventDefault();
      setLoading(true);
      await firestore.collection('Services').doc(id).set(serviceData)
      setServices(services.map(service => service.id === id ? serviceData : service))
      setLoading(false);
      const result = await Swal.fire({
        title: 'Success',
        text: 'Service Updated Successfully',
        icon: 'success',
      })
      if (result.value) history.goBack()
    } catch (err) {
      setLoading(false);
      await Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
      })
    }
  }
  const { ProductName, ProductDescription, ServiceStatus, ServiceType, Category, SubCategory, ContactNumber, Pricing, ProductImages } = serviceData
  // console.log(serviceData)
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 text-center'>
        <MDBRow>
          <MDBCol
            lg='12'
            xl='9'
            className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
          >
            {error && <MDBAlert color={errorType}>{error}</MDBAlert>}
            <form className="mt-4">
              {loading ?
                <div className='my-5 d-flex justify-content-around'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div> :
                <React.Fragment>
                  <div className="md-form form-group">
                    <select
                      value={ServiceType}
                      className="form-control custom-select"
                      onChange={e => handleChangeData("ServiceType", e.target.value)}
                    >
                      {!ServiceType ?
                        <option value={ServiceType}>{"Service Type"}</option> : null
                      }
                      <option value="Commercial">Commercial</option>
                      <option value="Non-Commercial">Non-Commercial</option>
                    </select>
                  </div>
                  <div className="md-form form-group">
                    <select onChange={e => handleChangeData("ServiceStatus", e.target.value)} className="form-control custom-select">
                      {!ServiceStatus ?
                        <option value={ServiceStatus}>{"Service Status"}</option> : null
                      }
                      <option value="active">active</option>
                      <option value="pending">pending</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </div>
                  <div className="md-form form-group">
                    <select onChange={e => {
                      handleChangeData("Category", JSON.parse(e.target.value));
                      handleChangeData("SubCategory", JSON.parse(e.target.value * 100 + 1))
                    }} className="form-control custom-select">
                      {!Category ?
                        <option value={Category}>Category</option> : null
                      }
                      {Object.keys(CategoriesToName).filter(_key => _key !== 4 && _key !== 10).map(key => {
                        return (
                          <option key={key} value={key}>{CategoriesToName[key]}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="md-form form-group">
                    <select onChange={e => handleChangeData("SubCategory", JSON.parse(e.target.value))} className="form-control custom-select">
                      {!SubCategory ?
                        <option value={SubCategory}>SubCategory</option> : null
                      }
                      {Object.keys(SubCategoriesToName).filter(_key => Category ? _key > (Category * 100) && _key < ((Category + 1) * 100) : false).map(key => {
                        return (
                          <option key={key} value={JSON.parse(key)}>{SubCategoriesToName[key]}</option>
                        )
                      })}
                    </select>
                  </div>
                  <MDBInput
                    value={ProductName ? ProductName : ''}
                    label='Service Name'
                    group
                    type='text'
                    onChange={e => handleChangeData("ProductName", e.target.value)}
                  />
                  <MDBInput
                    value={ProductDescription ? ProductDescription : ''}
                    label='Service Description'
                    group
                    type='textarea'
                    rows="2"
                    onChange={e => handleChangeData("ProductDescription", e.target.value)}
                  />
                  <MDBInput
                    value={ContactNumber ? ContactNumber : ''}
                    label='Contact Number'
                    group
                    type='text'
                    onChange={e => handleChangeData("ContactNumber", e.target.value)}
                  />
                  <MDBInput
                    value={Pricing ? Pricing : ''}
                    label='Pricing'
                    group
                    type='text'
                    onChange={e => handleChangeData("Pricing", e.target.value)}
                  />
                </React.Fragment>
              }
              {/* <MDBInput
                label='Start Time'
                group
                type='time'
              />
              <MDBInput
                label='End Time'
                group
                type='time'
              /> */}
              {ProductImages ?
                ProductImages.map(image => {
                  return (
                    <img
                      src={image}
                      class="img-thumbnail"
                      alt="..."
                    />
                  )
                }) : null}
              <MDBBtn onClick={handleSubmitChanges} color='mdb-color' className='text-xs-left'>
                Update
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    services: state.servicesReducer.services,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setServices: function (services) {
      dispatch(SetServices(services))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditServicePage);