import React, { createRef, useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert } from 'mdbreact';
import { useAuth } from '../../services/Auth'
import { useHistory } from 'react-router-dom'
const LoginPage = () => {
  const { currentUser, login } = useAuth()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()
  // console.log(currentUser, password, error, loading)

  const handleSignIn = async function (event) {
    try {
      event.preventDefault();
      setError(null); setLoading(true);
      if (email && password) {
        await login(email, password)
        setLoading(false); setError(null);
        history.push('/')
      } else {
        setLoading(false); setError('Please Add A Valid Email or Password')
      }
    } catch (err) {
      setLoading(false); setError(err.message)
    }
  }
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 text-center'>
        <MDBRow>
          <MDBCol
            md='8'
            lg='7'
            className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
          >
            <h2 className='text-center'>Login</h2>
            {loading &&
              <div className='my-5 d-flex justify-content-around'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            }
            {error && <MDBAlert color='danger'>
              {error}
            </MDBAlert>
            }
            <form className="mt-4">
              <MDBInput
                disabled={loading}
                onChange={e => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                label='Your email'
                group
                type='email'
                icon='envelope'
              />
              <MDBInput
                disabled={loading}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                label='Your password'
                group
                type='password'
                icon='lock'
              />
              <MDBBtn
                onClick={handleSignIn}
                disabled={loading}
                color='mdb-color' className='text-xs-left'>
                Login
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default LoginPage;