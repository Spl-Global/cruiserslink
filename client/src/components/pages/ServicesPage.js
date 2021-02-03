import React from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
const ServicesPage = () => {
  function testClickEvent(param) {
    console.log(param);
  }

  const data = () => ({
    columns: [
      {
        label: 'Product Name',
        field: 'product_name',
      },
      {
        label: 'Service Type',
        field: 'type',
      },
      {
        label: 'User',
        field: 'user',
      },
      {
        label: 'Category',
        field: 'category',
      },
      {
        label: 'SubCategory',
        field: 'subcategory',
      },
      {
        label: 'Contact Number',
        field: 'contact_number',
      },
      {
        label: 'Pricing',
        field: 'pricing',
      },
      {
        label: 'Time',
        field: 'time',
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
        product_name: 'Product abc',
        type: 'Non-Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
        clickEvent: row => testClickEvent(row)
      },
      {
        product_name: 'Product abc',
        type: 'Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Non-Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Non-Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Non-Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Non-Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Non-Commerciall',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
      {
        product_name: 'Product abc',
        type: 'Commercial',
        user: 'User 123',
        category: 'Yacht Services',
        subcategory: 'Dinghu Docks',
        contact_number: '+12334324442',
        pricing: '$10/hour',
        time: '12:00 - 2:00',
        edit: <MDBLink className="text-primary p-0" to='/edit_service'>Edit</MDBLink>,
        approve_reject: <MDBLink className="text-primary p-0" to='#'>Approve</MDBLink>,
      },
    ]
  });


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
          <h2 className="mb-0">Services</h2>
        </MDBCardBody>
      </MDBCard>
      <MDBCard>
        <MDBCardBody>
          <MDBDataTable responsive
            bordered
            entriesOptions={[10, 20, 25]}
            entries={10}
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
