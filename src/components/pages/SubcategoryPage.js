import React from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink } from 'mdbreact';

const SubcategoryPage = () => {
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
        label: 'Edit',
        field: 'edit',
      },
      {
        label: 'Delete',
        field: 'delete',
      },
    ],
    rows: [
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
        clickEvent: row => testClickEvent(row)
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
      },
      {
        name: 'Subcategory Name',
        edit: <MDBLink className="text-primary p-0" to='/edit_subcategory'>Edit</MDBLink>,
        delete: <MDBLink className="text-primary p-0" to='#'>Delete</MDBLink>,
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
            <h2 className="mb-0">Subcategories in this Service</h2>
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

export default SubcategoryPage;
