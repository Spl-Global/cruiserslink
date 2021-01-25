import React from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink } from 'mdbreact';

const ServicesPage = () => {
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
        label: 'User',
        field: 'user',
      },
      {
        label: 'Edit',
        field: 'edit',
      },
      {
        label: 'Approve/Reject',
        field: 'approve_reject',
      },
    ],
    rows: [
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Tiger Nixon',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
        clickEvent: row => testClickEvent(row)
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Garrett Winters',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Ashton Cox',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Cedric Kelly',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Airi Satou',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Brielle Williamson',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Herrod Chandler',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Rhona Davidson',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Colleen Hurst',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Sonya Frost',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        name: <MDBLink className="text-primary p-0" to='/subcategory'>Service Name</MDBLink>,
        user: 'Jena Gaines',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
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
      <MDBCard className="mb-5">
          <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <h2 className="mb-0">Services</h2>
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

export default ServicesPage;
