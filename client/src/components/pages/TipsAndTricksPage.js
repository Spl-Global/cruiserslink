import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBNavbarNav, MDBNavbar, MDBNavItem, MDBNavLink, MDBLink, MDBBtn, MDBIcon } from 'mdbreact';
import { TipsAndTricksCategories, TipsAndTricksColumns, TipsAndTricksSubCategories, } from '../../util/tipsandtricks'
import { connect } from 'react-redux'
import { SetTipAndTricks } from '../../Redux/actions/actions'
import { firestore } from '../../services/base';
import Swal from 'sweetalert2';
const TipsAndTricksPage = (props) => {
    const limit = 25;
    const { tipsandtricks, setTipsAndTricks } = props
    const [activePage, setActivePage] = useState('all')
    const [data, setData] = useState({ columns: TipsAndTricksColumns, rows: [] })
    const [error, setError] = useState('')
    function testClickEvent(param) {
        console.log(param);
    }
    const handleDeleteTipAndTrick = function (event, id) {
        event.preventDefault()
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this tip and trick and all the reviews linked to it.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                firestore.collection('TipsAndTricks').doc(id).delete().then(() => {
                    firestore.collection('TipsAndTricksReviews').doc(id).delete().then(() => {
                        Swal.fire({ title: 'Success', text: 'Tip And Trick Deleted Successfully', icon: 'success' }).then((value) => {
                            setTipsAndTricks(tipsandtricks.filter(x => x.id !== id));
                        })
                    }).catch(err => {
                        Swal.fire({ title: 'Error', text: err.message, icon: 'error' }).then((value) => { })
                    })
                }).catch(err => {
                    Swal.fire({ title: 'Error', text: err.message, icon: 'error' }).then((value) => { })
                })
            }
        })
    }
    useEffect(() => {
        setData({
            columns: data.columns,
            rows: tipsandtricks.map(tipandtrick => {
                return {
                    subject: tipandtrick.subject,
                    description: tipandtrick.description,
                    category: TipsAndTricksCategories[tipandtrick.category],
                    subcategory: tipandtrick.subcategory ? TipsAndTricksSubCategories[tipandtrick.subcategory] : '--',
                    postedByName: tipandtrick.postedByName,
                    anonymous: JSON.stringify(tipandtrick.anonymous),
                    avgRating: tipandtrick.avgRating.toFixed(2),
                    numRating: tipandtrick.numRating,
                    _rating_: <MDBLink className="text-primary p-0" to={`/ratingsandcomments/tipandtrick/${tipandtrick.id}`}>View Ratings</MDBLink>,
                    // status: < MDBLink className="text-primary p-0" to="#">{tipandtrick.status}</MDBLink >,
                    status: tipandtrick.status,
                    actions: <div><MDBLink className="text-primary d-inline mr-2 p-0" title="Edit" to={`/edit_tipandtrick/${tipandtrick.id}`}><MDBIcon fas icon="edit" /></MDBLink>
                        <MDBLink to="#" className="text-danger d-inline p-0" title="Delete" onClick={e => handleDeleteTipAndTrick(e, tipandtrick.id)}><MDBIcon fas icon="trash-alt" /></MDBLink></div>,
                    clickEvent: row => testClickEvent(row)
                }
            })
        })
    }, [tipsandtricks])

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

    const handleChangeActivePage = function (e, text) {
        e.preventDefault();
        setActivePage(text);
    }

    useEffect(() => {
        fetchTipsAndTricks()
    }, [])
    return (
        <React.Fragment>
            <MDBCard className="mb-5">
                <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0">Tips And Tricks</h2>
                </MDBCardBody>
            </MDBCard>
            <MDBNavbar color="white" light expand="xs" className="tabs-nav">
                <MDBNavbarNav left>
                    <MDBNavItem active={activePage === "all"}>
                        <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'all')}>All</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={activePage === "active"}>
                        <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'active')}>Active</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={activePage === "pending"}>
                        <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'pending')}>Pending</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={activePage === "inactive"}>
                        <MDBNavLink to="#" onClick={e => handleChangeActivePage(e, 'inactive')}>Inactive</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBNavbar>
            <MDBCard>
                {activePage === "all" ?
                <MDBCardBody>
                    <MDBDataTable
                        responsive
                        bordered
                        entriesOptions={[10, 20, 25]}
                        entries={10}
                        pagesAmount={4}
                        data={data}
                        // data={{
                        //     columns: data.columns, rows: data.rows.map(row => {
                        //         return {
                        //             ...row,
                        //             delete: < MDBBtn onClick={e => handleDeleteTipAndTrick(e, row.id)} color="danger">Delete</ MDBBtn>,
                        //         }
                        //     })
                        // }}
                        materialSearch
                        disableRetreatAfterSorting={true}
                        onPageChange={value => {
                            if (value.activePage === value.pagesAmount)
                                setTimeout(fetchTipsAndTricks(), 250);
                        }}
                    />
                </MDBCardBody>:
                <MDBCardBody>
                <MDBDataTable
                    responsive
                    bordered
                    entriesOptions={[10, 20, 25]}
                    entries={10}
                    pagesAmount={4}
                    data={{
                        columns: data.columns, 
                        rows: data.rows.filter(row => {
                            return row.status === activePage
                        })
                    }}
                    materialSearch
                    disableRetreatAfterSorting={true}
                    onPageChange={value => {
                        if (value.activePage === value.pagesAmount)
                            setTimeout(fetchTipsAndTricks(), 250);
                    }}
                />
            </MDBCardBody>}
            </MDBCard>
        </React.Fragment>

    );
};
const mapStateToProps = state => {
    return {
        tipsandtricks: state.tipsandtricksReducer.tipsandtricks,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTipsAndTricks: function (tipsandtricks) {
            dispatch(SetTipAndTricks(tipsandtricks))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TipsAndTricksPage);
