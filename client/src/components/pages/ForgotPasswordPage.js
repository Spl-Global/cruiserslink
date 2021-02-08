import React from 'react'
import logo from "../../assets/cruiserslink.png";
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBLink } from 'mdbreact';


const ForgotPasswordPage =  () => {
  return (
    <React.Fragment>
      <MDBContainer className='d-flex h-100 justify-content-center flex-column'>
          <MDBRow>
            <MDBCol
              md='8'
              lg='7'
              className='text-left mx-auto float-none white z-depth-1 p-4 px-lg-5'
            >
                <div className="text-center">
                  <img alt="CruisersLink Logo" className="img-fluid mb-4" src={logo} width="200" />
                  <h2>Forgot Password</h2>
                </div>
                <form className="mt-4">
                  <MDBInput
                    label='Enter Your email'
                    group
                    type='email'
                    icon='envelope'
                  />
                  <div className="d-flex justify-content-between align-items-center">
                    <MDBBtn color='mdb-color' className='text-xs-left'>
                      Reset Password
                    </MDBBtn>
                    <MDBLink className="text-primary p-0" to='/login'>Login</MDBLink>
                  </div>
                </form>
            </MDBCol>
          </MDBRow>
    </MDBContainer>
    </React.Fragment>
  )
}

export default ForgotPasswordPage;