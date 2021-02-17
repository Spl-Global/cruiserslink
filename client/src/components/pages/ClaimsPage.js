import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBAlert, MDBLink } from 'mdbreact';
import { connect } from 'react-redux';
import image from "../../assets/cruiserslink.png";
import { firestore } from '../../services/base'
import { claimsColumns } from '../../util/claims'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../services/Auth';
const UsersPage = ({ users, setUsers }) => {
  const limit = 25;
  function testClickEvent(param) {
    console.log(param);
  }
  const { currentUser } = useAuth();
  const [data, setData] = useState({ columns: claimsColumns, rows: [] })
  const [error, setError] = useState('')
  const history = useHistory()
  useEffect(() => {
    setData({
      columns: data.columns,
      rows: users.map(value => {
        return {
          subject: 'abc',
          description: 'abc',
          attachment: <img src={image} className="img-thumbnail" alt="Image"
        />,
          actions: value.approve ? <MDBLink className="text-primary p-0" to="#" onClick={e => { e.preventDefault(); ToggleEnableDisable(value.id, false) }}>Approve</MDBLink> : <MDBLink to="#" className="text-danger p-0" onClick={e => { e.preventDefault(); ToggleEnableDisable(value.id, true) }}>Reject</MDBLink>,
          clickEvent: row => testClickEvent(row),
        }
      })
    })
  }, [users])

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

  const ToggleEnableDisable = async function (id, value) {
    try {
      console.log(id,value)
      const response = await fetch('/api/enable_disable', { method: 'POST', headers: { Authorization: `Bearer ${currentUser.uid}` }, body: JSON.stringify({ id: id, value: value }) })
      const jsonResponse = await response.json();
      console.log(jsonResponse, response.status)
      if (response.status === 200) {
        setUsers(users.map(user => user.id === id ? { ...user, disabled: value } : user))
      } else {

      }
    } catch (err) {

    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <React.Fragment>
      <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">Users</h2>
        </MDBCardBody>
        {error && <MDBAlert color="danger">{error}</MDBAlert>}
      </MDBCard>
      <MDBCard>
        <MDBCardBody>
          <MDBDataTable
            responsive
            bordered
            disableRetreatAfterSorting={true}
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            materialSearch
            onPageChange={value => {
              if (value.activePage === value.pagesAmount)
                setTimeout(fetchUsers(), 250);
            }}
          />
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>

  );
};
const mapStateToProps = state => {
  return {
    users: state.usersReducer.users
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUsers: function (users) { dispatch(SetUsers(users)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
