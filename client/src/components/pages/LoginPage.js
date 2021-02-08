import React, { createRef, useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert, MDBLink } from 'mdbreact';
import logo from "../../assets/cruiserslink.png";
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
        const cred = await login(email, password)
        cred.user.getIdTokenResult()
          .then(idTokenResult => {
            if (!!idTokenResult.claims.admin) {
              setLoading(false); setError(null);
              history.push('/')
            } else {
              setLoading(false);
              setError('Entered User is not An Admin.');
            }
          }).catch(err => {
            setLoading(false);
            setError(err.message);
          })
      } else {
        setLoading(false); setError('Please Add A Valid Email or Password')
      }
    } catch (err) {
      setLoading(false); setError(err.message)
    }
  }
  return (
    <React.Fragment>
      <MDBContainer className='d-flex h-100 justify-content-center flex-column'>
        <MDBRow>
          <MDBCol
            md='8'
            lg='7'
            className='mx-auto float-none white z-depth-1 p-4 px-lg-5'
          >
            <div className="text-center">
              <img alt="CruisersLink Logo" className="img-fluid mb-4" src={logo} width="200" />
              <h2>Login</h2>
            </div>
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
              <div className="d-flex justify-content-between align-items-center">
                <MDBBtn
                  onClick={handleSignIn}
                  disabled={loading}
                  color='mdb-color' className='text-xs-left'>
                  Login
                </MDBBtn>
                <MDBLink className="text-primary p-0" to='/forgot-password'>Forgot Password?</MDBLink>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default LoginPage;