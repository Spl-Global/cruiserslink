import React, { useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink } from 'mdbreact';
import TopNavigation from '../topNavigation'
import SideNavigation from '../sideNavigation'
const RatingsAndCommentsPage = () => {
    function testClickEvent(param) {
        console.log(param);
    }
    const [data, setData] = useState({ columns: [], rows: [] })

    return (
        <React.Fragment>
            <TopNavigation />
            <SideNavigation />
            <MDBCard className="mb-5">
                <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0">Ratings</h2>
                </MDBCardBody>
            </MDBCard>
            <MDBCard>
                <MDBCardBody>
                    <MDBDataTable responsive
                        bordered
                        entriesOptions={[10, 20, 25]}
                        entries={10}
                        pagesAmount={4}
                        data={data}
                        materialSearch
                    />
                </MDBCardBody>
            </MDBCard>
        </React.Fragment>

    );
};

export default RatingsAndCommentsPage;
