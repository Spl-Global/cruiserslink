import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import TopNavigation from '../topNavigation';
import SideNavigation from '../sideNavigation'
const DashboardPage = () => {
  return (
    <React.Fragment>
      <TopNavigation />
      <SideNavigation />
      <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">Dashboard</h2>
        </MDBCardBody>
      </MDBCard>
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon fas icon="users" className="fa-2x" />
              </div>
              <h5 className="white-text">Users</h5>
              <h3><strong>2000</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="warning-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="list" className="fa-2x" />
              </div>
              <h5 className="white-text">Services</h5>
              <h3><strong>200</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="list" className="fa-2x" />
              </div>
              <h5 className="white-text">Categories</h5>
              <h3><strong>20000</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="list" className="fa-2x" />
              </div>
              <h5 className="white-text">Sub Categories</h5>
              <h3><strong>2000</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  )
}

export default DashboardPage;