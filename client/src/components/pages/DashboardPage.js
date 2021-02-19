import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBAlert } from 'mdbreact';
import { ResetClaims, ResetFeedbackAndRatings, ResetServices, ResetTipsAndTricks, ResetUsers, SetClaims, SetFeedbackAndRatings, SetServices, SetTipAndTricks, SetUsers } from '../../Redux/actions/actions';
import { firestore } from '../../services/base'
import { connect } from 'react-redux';
import { useAuth } from '../../services/Auth';
const DashboardPage = (props) => {
  const limit = 25;
  const { currentUser } = useAuth();
  const [error, setError] = useState('')
  const { users, setUsers, resetUsers, pageToken } = props
  const { services, setServices, resetServices } = props
  const { tipsandtricks, setTipsAndTricks, resetTipsAndTricks } = props
  const { rating_and_feedbacks, setFeedbackAndRatings, resetFeedbackAndRatings } = props
  const { claims, setClaims, resetClaims } = props

  const fetchUsers = function () {
    if (users.length > 0) {
      const lastUser = users[users.length - 1]
      firestore
        .collection('Users')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .startAfter(lastUser.id)
        .get()
        .then(querySnap => {
          setUsers([
            ...users,
            ...querySnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          ])
        }).catch(err => {
          setError(err.message)
        })
    } else {
      firestore
        .collection('Users')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .get()
        .then(querySnap => {
          setUsers(querySnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        }).catch(err => {
          setError(err.message)
        })
    }
  }

  const fetchServices = function () {
    if (services.length > 0) {
      const lastService = services[services.length - 1]
      firestore
        .collection('Services')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .startAfter(lastService.id)
        .get()
        .then(querySnap => {
          setServices([
            ...services,
            ...querySnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          ])
        }).catch(err => {
          setError(err.message)
        })
    } else {
      firestore
        .collection('Services')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .get()
        .then(querySnap => {
          setServices(querySnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        }).catch(err => {
          setError(err.message)
        })
    }
  }

  const fetchTipsAndTricks = function () {
    if (tipsandtricks.length > 0) {
      const lastTipAndTrick = tipsandtricks[tipsandtricks.length - 1]
      firestore
        .collection('TipsAndTricks')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .startAfter(lastTipAndTrick.id)
        .get()
        .then(querySnap => {
          setTipsAndTricks([
            ...tipsandtricks,
            ...querySnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          ])
        }).catch(err => {
          setError(err.message)
        })
    } else {
      firestore
        .collection('TipsAndTricks')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .get()
        .then(querySnap => {
          setTipsAndTricks(querySnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        }).catch(err => {
          setError(err.message)
        })
    }
  }

  const fetchClaims = function () {
    if (claims.length > 0) {
      const lastClaim = claims[claims.length - 1]
      firestore
        .collection('Claims')
        .limit(limit)
        .orderBy('__name__', 'asc')
        .startAfter(lastClaim.id)
        .get()
        .then(querySnap => {
          setClaims([
            ...claims,
            ...querySnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          ])
        }).catch(err => {
          setError(err.message)
        })
    } else {
      firestore
        .collection('Claims')
        .orderBy('__name__', 'asc')
        .limit(limit)
        .get()
        .then(querySnap => {
          setClaims(querySnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        }).catch(err => {
          setError(err.message)
        })
    }
  }
  const fetchUsersFromAPI = async function () {
    try {
      if (users.length > 0 && pageToken) {
        const response = await fetch(`api/getUsers?pageToken=${pageToken}`, { method: 'GET', headers: { Authorization: `Bearer ${currentUser.uid}`, }, })
        const jsonResponse = await response.json()
        if (response.status === 200) {
          setUsers([...users, ...jsonResponse.users], jsonResponse.pageToken)
        } else {
          setError(jsonResponse.message)
        }
      } else if (users.length > 0 && !pageToken) {

      } else {
        const _response = await fetch(`api/getUsers?pageToken=${pageToken}`, { method: 'GET', headers: { Authorization: `Bearer ${currentUser.uid}`, }, })
        const _jsonResponse = await _response.json()
        if (_response.status === 200) {
          setUsers(_jsonResponse.users, _jsonResponse.pageToken)
        } else {
          setError(jsonResponse.message)
        }
      }
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchServices();
    fetchTipsAndTricks();
    fetchClaims();
    // fetchUsersFromAPI()
  }, [])
  return (
    <React.Fragment>
      <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">Dashboard</h2>
        </MDBCardBody>
        {error && <MDBAlert color="danger">{error}</MDBAlert>}
      </MDBCard>
      <MDBRow className="mb-4">
        <MDBCol xl="4" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon fas icon="users" className="fa-2x" />
              </div>
              <h5 className="white-text">Users</h5>
              <h3><strong>{users.length}</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-3">
          <MDBCard color="warning-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="list" className="fa-2x" />
              </div>
              <h5 className="white-text">Services</h5>
              <h3><strong>{services.length}</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="lightbulb" className="fa-2x" />
              </div>
              <h5 className="white-text">Tips And Tricks</h5>
              <h3><strong>{tipsandtricks.length}</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        {/* <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody className="py-4 px-3">
              <div className="float-right">
                <MDBIcon icon="list" className="fa-2x" />
              </div>
              <h5 className="white-text">Ratings</h5>
              <h3><strong>NA</strong></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol> */}
      </MDBRow>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    pageToken: state.usersReducer.pageToken,
    services: state.servicesReducer.services,
    tipsandtricks: state.tipsandtricksReducer.tipsandtricks,
    rating_and_feedbacks: state.ratingsandfeedbackReducer.rating_and_feedbacks,
    claims: state.claimsReducer.claims,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUsers: function (users, pageToken) {
      dispatch(SetUsers(users, pageToken))
    },
    setServices: function (services) {
      dispatch(SetServices(services))
    },
    setTipsAndTricks: function (tipsandtricks) {
      dispatch(SetTipAndTricks(tipsandtricks))
    },
    setFeedbackAndRatings: function (rating_and_feedbacks) {
      dispatch(SetFeedbackAndRatings(rating_and_feedbacks))
    },
    setClaims: function (claims) {
      dispatch(SetClaims(claims))
    },
    resetUsers: function () {
      dispatch(ResetUsers())
    },
    resetServices: function () {
      dispatch(ResetServices())
    },
    resetTipsAndTricks: function () {
      dispatch(ResetTipsAndTricks())
    },
    resetFeedbackAndRatings: function () {
      dispatch(ResetFeedbackAndRatings())
    },
    resetClaims: function () {
      dispatch(ResetClaims())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);