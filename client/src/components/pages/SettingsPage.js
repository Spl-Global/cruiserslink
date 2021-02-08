import React, { useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert, } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
import { useAuth } from '../../services/Auth';
import app, { auth } from '../../services/base';
import firebase from 'firebase/app'
const SettingsPage = () => {
  const { currentUser } = useAuth()
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState(null)
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const [errorType, setErrorType] = useState('danger')
  const [loading, setLoading] = useState('')
  const reauthenticate = (pass) => {
    const user = app.auth().currentUser;
    const cred = firebase.default.auth.EmailAuthProvider.credential(email, pass);
    return user.reauthenticateWithCredential(cred);
  }
  const handleChangePassword = function (event) {

    event.preventDefault()
    if (email && currentPassword && newPassword && confirmNewPassword) {
      if (newPassword === confirmNewPassword) {
        setError(null); setLoading(true);
        reauthenticate(currentPassword).then(() => {
          const user = firebase.default.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
            setError('Password Changed Successfully'); setLoading(false); setErrorType('success');
            setEmail(''); setNewPassword(''); setConfirmNewPassword(''); setCurrentPassword('');
          })
            .catch((error) => {
              setError(error.message); setLoading(false); setErrorType('danger');
            });
        })
          .catch((error) => {
            setError(error.message); setLoading(false); setErrorType('danger');
          });
      } else {
        setError('Passwords Do Not Match'); setLoading(false); setErrorType('danger');
      }
    } else {
      setError('Please Add Valid Credentials')
      setLoading(false); setErrorType('danger')
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
            <h2 className='text-center'>Settings</h2>
            {error && <MDBAlert color={errorType}>
              {error}
            </MDBAlert>}
            {loading &&
              <div className='my-5 d-flex justify-content-around'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            }
            <form className="mt-4">
              <MDBInput
                value={email}
                label='Enter Your Email'
                group
                type='email'
                icon='envelope'
                onChange={e => {
                  setEmail(e.target.value);
                  setError(null);
                }}
              />
              <MDBInput
                value={newPassword}
                label='Enter Your New Password'
                group
                type='password'
                icon='lock'
                onChange={e => {
                  setNewPassword(e.target.value);
                  setError(null);
                }}
              />
              <MDBInput
                value={confirmNewPassword}
                label='Confirm Your New Password'
                group
                type='password'
                icon='lock'
                onChange={e => {
                  setConfirmNewPassword(e.target.value);
                  setError(null);
                }}
              />
              <MDBInput
                value={currentPassword}
                label='Enter Your Current Password'
                group
                type='password'
                icon='lock'
                onChange={e => {
                  setCurrentPassword(e.target.value);
                  setError(null);
                }}
              />
              <MDBBtn onClick={handleChangePassword} color='mdb-color' className='text-xs-left'>
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