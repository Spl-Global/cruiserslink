import React from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, } from 'mdbreact';


const EditServicePage =  () => {
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 text-center'>
          <MDBRow>
            <MDBCol
              md='8'
              lg='7'
              className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
            >
                <h2 className='text-center'>Edit Service</h2>
                <form className="mt-4">
                  <MDBInput
                    label='Name'
                    group
                    type='text'
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

export default EditServicePage;