import React from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, } from 'mdbreact';


const SettingsPage =  () => {
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 text-center'>
          <MDBRow>
            <MDBCol
              md='8'
              lg='7'
              className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
            >
                <h2 className='text-center'>Settings</h2>
                <form className="mt-4">
                  <MDBInput
                    label='Enter Your Email'
                    group
                    type='email'
                    icon='envelope'
                  />
                  <MDBInput
                    label='Enter Your New Password'
                    group
                    type='password'
                    icon='lock'
                  />
                  <MDBInput
                    label='Confirm Your New Password'
                    group
                    type='password'
                    icon='lock'
                  />
                  <MDBInput
                    label='Enter Your Current Password'
                    group
                    type='password'
                    icon='lock'
                  />
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

export default SettingsPage;