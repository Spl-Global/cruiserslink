import React from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, } from 'mdbreact';


const ForgotPasswordPage =  () => {
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 text-center'>
          <MDBRow>
            <MDBCol
              md='8'
              lg='7'
              className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
            >
                <h2 className='text-center'>Forgot Password?</h2>
                <form className="mt-4">
                  <MDBInput
                    label='Enter Your email'
                    group
                    type='email'
                    icon='envelope'
                  />
                  <MDBBtn color='mdb-color' className='text-xs-left'>
                    Reset Password
                  </MDBBtn>
                </form>
            </MDBCol>
          </MDBRow>
    </MDBContainer>
    </React.Fragment>
  )
}

export default ForgotPasswordPage;