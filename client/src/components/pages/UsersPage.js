import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBAlert, MDBLink } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
import { SetUsers } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { firestore } from '../../services/base'
import { userColumns } from '../../util/users'
import { useHistory } from 'react-router-dom';
const UsersPage = ({ users, setUsers }) => {
  const limit = 25;
  function testClickEvent(param) {
    // console.log(param);
  }
  const [data, setData] = useState({ columns: userColumns, rows: [] })
  const [error, setError] = useState('')
  const history = useHistory()
  useEffect(() => {
    setData({
      columns: data.columns,
      rows: users.map(value => {
        return {
          fullName: value.fullName,
          userType: value.userType,
          email: value.email,
          edit: <MDBLink className="text-primary p-0" to={`/edit_users/${value.id}`}>Edit</MDBLink>,
          enable_disable: <a href="#" className="text-primary">Disable</a>,
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
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            materialSearch
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
