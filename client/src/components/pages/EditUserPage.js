import React, { useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert } from 'mdbreact';
// import GoogleMapReact from 'google-map-react';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
import { useParams } from 'react-router-dom';
import { SetUsers } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { firestore } from '../../services/base';
const EditUserPage = (props) => {
    const { id } = useParams()
    const { users, setUsers } = props
    const [error, setError] = useState('')
    const [errorType, setErrorType] = useState('danger')
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        businessData: {},
        cruiserData: {},
        userType: ''
    })
    useEffect(() => {
        users.forEach(x => {
            if (x.id === id) {
                setUserData(x)
            }
        })
    }, [id])

    const handleChangeData = function (type, key, value) {
        // console.log(type, key, value)
        if (type === "cruiser") {
            setUserData({
                ...userData,
                cruiserData: {
                    ...userData.cruiserData,
                    [key]: value
                }
            })
        } else if (type === "business") {
            setUserData({
                ...userData,
                businessData: {
                    ...userData.businessData,
                    [key]: value
                }
            })
        }
    }

    const handleSubmitChange = async function (event) {
        try {
            event.preventDefault()
            setError(null); setErrorType('danger'); setLoading(true);
            await firestore.collection('Users').doc(id).set(userData)
            setUsers(users.map(x => x.id === id ? userData : x))
            setError('User Edited Successfully'); setErrorType('success'); setLoading(false);
        } catch (err) {
            setError(err.message); setErrorType('danger'); setLoading(false);
        }
    }
    const { userType, cruiserData, businessData } = userData
    const { BoatName, Crew, OwnerCaptain, Status, } = cruiserData
    const { BusinessName, ContactEmail, ContactPerson, WEBLink, Website } = businessData
    const { Telephone, WhatsApp } = userType === "cruiser" ? cruiserData : businessData
    return (
        <React.Fragment>
            {/* <TopNavigation />
            <SideNavigation /> */}
            <MDBContainer className='mt-5 text-center'>
                <MDBRow>
                    <MDBCol
                        lg='12'
                        xl='9'
                        className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
                    >
                        <h2 className='text-center'>Edit User</h2>
                        {error && <MDBAlert color={errorType}>{error}</MDBAlert>}
                        <form className="mt-4">
                            {loading ?
                                <div className='my-5 d-flex justify-content-around'>
                                    <div className='spinner-border text-primary' role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </div>
                                </div> :
                                userType === "cruiser" ?
                                    <React.Fragment>
                                        <div className="md-form form-group">
                                            <select value={userType}
                                                onChange={e => {
                                                    setUserData({
                                                        ...userData,
                                                        userType: e.target.value
                                                    })
                                                }}
                                                className="form-control custom-select">
                                                <option value>User Type</option>
                                                <option value="cruiser">cruiser</option>
                                                <option value="business">business</option>
                                            </select>
                                        </div>
                                        <MDBInput
                                            value={BoatName ? BoatName : ''}
                                            label='Boat Name'
                                            group
                                            type='text'
                                            onChange={e => handleChangeData(userType, "BoatName", e.target.value)}
                                        />
                                        <MDBInput
                                            value={Crew ? Crew : ''}
                                            label='Crew'
                                            group
                                            type='text'
                                            onChange={e => handleChangeData(userType, "Crew", e.target.value)}
                                        // rows="2"
                                        />
                                        <MDBInput
                                            value={OwnerCaptain ? OwnerCaptain : ''}
                                            label='Owner Captain'
                                            group
                                            type='text'
                                            onChange={e => handleChangeData(userType, "OwnerCaptain", e.target.value)}
                                        />
                                        <div className="md-form form-group">
                                            <select value={Status ? Status : ''}
                                                onChange={e => handleChangeData(userType, "Status", e.target.value)}
                                                className="form-control custom-select">
                                                <option value>Status</option>
                                                <option value="Couple">Couple</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Family">Family</option>
                                            </select>
                                        </div>
                                        <MDBInput
                                            value={Telephone ? Telephone.value ? Telephone.value : '' : ''}
                                            label='TelePhone'
                                            group
                                            type='text'
                                            onChange={e => handleChangeData(userType, "Telephone", { ...Telephone, value: e.target.value })}
                                        />
                                        <MDBInput
                                            value={WhatsApp ? WhatsApp.value ? WhatsApp.value : '' : ''}
                                            label='WhatsApp'
                                            group
                                            type='text'
                                            onChange={e => handleChangeData(userType, "WhatsApp", { ...WhatsApp, value: e.target.value })}
                                        />
                                    </React.Fragment> :
                                    userType === "business" ?
                                        <React.Fragment>
                                            <div className="md-form form-group">
                                                <select
                                                    value={userType}
                                                    onChange={e => {
                                                        setUserData({
                                                            ...userData,
                                                            userType: e.target.value
                                                        })
                                                    }}
                                                    className="form-control custom-select">
                                                    <option value>User Type</option>
                                                    <option value="cruiser">cruiser</option>
                                                    <option value="business">business</option>
                                                </select>
                                            </div>
                                            <MDBInput
                                                value={BusinessName ? BusinessName : ''}
                                                label='Business Name'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "BusinessName", e.target.value)}
                                            />
                                            <MDBInput
                                                value={ContactEmail ? ContactEmail : ''}
                                                label='Contact Email'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "ContactEmail", e.target.value)}
                                            />
                                            <MDBInput
                                                value={ContactPerson ? ContactPerson : ''}
                                                label='Contact Person'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "ContactPerson", e.target.value)}
                                            />
                                            <MDBInput
                                                value={WEBLink ? WEBLink : ''}
                                                label='WEB Link'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "WEBLink", e.target.value)}
                                            />
                                            <MDBInput
                                                value={Website ? Website : ''}
                                                label='Website'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "Website", e.target.value)}
                                            />
                                            <MDBInput
                                                value={Telephone ? Telephone.value ? Telephone.value : '' : ''}
                                                label='TelePhone'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "Telephone", e.target.value)}
                                            />
                                            <MDBInput
                                                value={WhatsApp ? WhatsApp.value ? WhatsApp.value : '' : ''}
                                                label='WhatsApp'
                                                group
                                                type='text'
                                                onChange={e => handleChangeData(userType, "WhatsApp", e.target.value)}
                                            />
                                        </React.Fragment> :
                                        <div className="md-form form-group">
                                            <select value={userType}
                                                onChange={e => {
                                                    setUserData({
                                                        ...userData,
                                                        userType: e.target.value
                                                    })
                                                }}
                                                className="form-control custom-select">
                                                <option value>User Type</option>
                                                <option value="cruiser">cruiser</option>
                                                <option value="business">business</option>
                                            </select>
                                        </div>
                            }
                            <MDBBtn onClick={handleSubmitChange} disabled={loading} color='mdb-color' className='text-xs-left'>
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
        users: state.usersReducer.users,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUsers: function (users) {
            dispatch(SetUsers(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);