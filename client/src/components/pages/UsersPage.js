import React from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
const UsersPage = () => {
  function testClickEvent(param) {
    console.log(param);
  }

  const data = () => ({
    columns: [
      {
        label: 'Name',
        field: 'name',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name'
        }
      },
      {
        label: 'Services',
        field: 'services',
      },
      {
        label: 'Edit',
        field: 'edit',
      },
      {
        label: 'Enable/Disable',
        field: 'enable_disable',
      },
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
        clickEvent: row => testClickEvent(row)
      },
      {
        name: 'Garrett Winters',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Ashton Cox',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Cedric Kelly',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Airi Satou',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Brielle Williamson',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Herrod Chandler',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Rhona Davidson',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Colleen Hurst',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Sonya Frost',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      },
      {
        name: 'Jena Gaines',
        services: '2',
        edit: <a href="#" className="text-primary">Edit</a>,
        enable_disable: <a href="#" className="text-primary">Disable</a>,
      }
    ]
  });

  const badgesData = {
    columns: [
      {
        label: 'ID',
        field: 'badge'
      },
      ...data().columns
    ],
    rows: [
      ...data().rows.map((row, order) => ({
        ...row,
        badge: (
          <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
            ID: {order + 1}
          </MDBBadge>
        )
      }))
    ]
  };

  const widerData = {
    columns: [
      ...data().columns.map(col => {
        col.width = 200;
        return col;
      })
    ],
    rows: [...data().rows]
  };

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
          <MDBDataTable responsive
            bordered
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data()}
            materialSearch
          />
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>

  );
};

export default UsersPage;
