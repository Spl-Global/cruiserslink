import React from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer } from 'mdbreact';
import GoogleMapReact from 'google-map-react';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
import { useParams } from 'react-router-dom';
const EditServicePage = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <React.Fragment>
      <TopNavigation />
      <SideNavigation />
      <MDBContainer className='mt-5 text-center'>
        <MDBRow>
          <MDBCol
            lg='12'
            xl='9'
            className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
          >
            <h2 className='text-center'>Edit Service</h2>
            <form className="mt-4">
              <div className="md-form form-group">
                <select className="form-control custom-select">
                  <option value>Service Type</option>
                  <option value="1">Commercial</option>
                  <option value="2">Non-Commercial</option>
                </select>
              </div>
              <div className="md-form form-group">
                <select className="form-control custom-select">
                  <option value>Category</option>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                </select>
              </div>
              <div className="md-form form-group">
                <select className="form-control custom-select">
                  <option value>SubCategory</option>
                  <option value="1">SubCategory 1</option>
                  <option value="2">SubCategory 2</option>
                </select>
              </div>
              <MDBInput
                label='Product Name'
                group
                type='text'
              />
              <MDBInput
                label='Product Description'
                group
                type='textarea'
                rows="2"
              />
              <MDBInput
                label='Contact Number'
                group
                type='text'
              />
              <MDBInput
                label='Pricing'
                group
                type='text'
              />
              <MDBInput
                label='Start Time'
                group
                type='time'
              />
              <MDBInput
                label='End Time'
                group
                type='time'
              />
              <label>Location</label>
              <div style={{ height: '300px' }} className="text-center mb-3">
                <GoogleMapReact
                  defaultCenter={{ lat: 10, lng: 10 }}
                  defaultZoom={7}
                />
              </div>
              <MDBBtn color='mdb-color' className='text-xs-left'>
                Update
                  </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default EditServicePage;