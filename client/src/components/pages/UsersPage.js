import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
import { SetUsers } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { firestore } from '../../services/base'
import { userColumns } from '../../util/users'
const UsersPage = () => {
  function testClickEvent(param) {
    console.log(param);
  }
  const [data, setData] = useState({ columns: [], rows: [] })
  useEffect(() => {
    const unsubscribe = firestore.collection('Users').onSnapshot(querySnap => {
      let rows = []
      querySnap.forEach((x, i) => {
        const value = x.data()
        // console.log(value)
        const datatoAdd = {
          fullName: value.fullName,
          userType: value.userType,
          email: value.email,
          edit: <a href="#" className="text-primary">Edit</a>,
          enable_disable: <a href="#" className="text-primary">Disable</a>,
          clickEvent: row => testClickEvent(row),
        }
        rows = [...rows, datatoAdd]
      })
      // console.log(userColumns, rows)
      setData({
        columns: userColumns,
        rows,
      })
    })
    return unsubscribe
  }, [])
  return (
    <React.Fragment>
      <TopNavigation />
      <SideNavigation />
      <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">Users</h2>
        </MDBCardBody>
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
