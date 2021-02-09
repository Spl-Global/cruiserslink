import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink, MDBAlert, MDBBtn } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { firestore } from '../../services/base';
import { ServiceFeedBackColumns, TipAndTrickFeedBackColumns } from '../../util/feedback'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
const RatingsAndCommentsPage = () => {
    function testClickEvent(param) {
        // console.log(param);
    }
    const limit = 25;
    const { type, id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [feedbackData, setFeedbackData] = useState({ columns: type === "service" ? ServiceFeedBackColumns : TipAndTrickFeedBackColumns, rows: [] })
    console.log(type, id)
    const fetchServiceRatings = async function () {
        try {
            if (feedbackData.rows.length > 0) {
                const lastRecord = feedbackData[feedbackData.length - 1]
                const results = await firestore
                    .collection('ServiceDetails')
                    .doc(id)
                    .collection('ratings')
                    .orderBy('__name__', 'asc')
                    .startAfter(lastRecord.id)
                    .limit(limit)
                    .get()
                setFeedbackData({
                    columns: ServiceFeedBackColumns,
                    rows: results.docs.map(doc => {
                        const value = doc.data()
                        return {
                            id: doc.id,
                            postedByName: value.postedByName,
                            rating: value.rating,
                            ratingComment: value.ratingComment,
                            timeUpdated: value.timeUpdated.toDate().toString(),
                        }
                    })
                })
            } else {
                const _results = await firestore
                    .collection('ServiceDetails')
                    .doc(id)
                    .collection('ratings')
                    .orderBy('__name__', 'asc')
                    .limit(limit)
                    .get()
                setFeedbackData({
                    columns: ServiceFeedBackColumns,
                    rows: _results.docs.map(doc => {
                        const _value = doc.data()
                        return {
                            id: doc.id,
                            postedByName: _value.postedByName,
                            rating: _value.rating,
                            ratingComment: _value.ratingComment,
                            timeUpdated: _value.timeUpdated.toDate().toString(),
                        }
                    })
                })
            }
        } catch (err) {
            setError(err.message)
        }
    }

    const fetchTipAndTrickRatings = async function () {
        try {
            if (feedbackData.rows.length > 0) {
                const lastRecord = feedbackData[feedbackData.length - 1]
                const results = await firestore
                    .collection('TipsAndTrickReviews')
                    .doc(id)
                    .collection('ratings')
                    .orderBy('__name__', 'asc')
                    .startAfter(lastRecord.id)
                    .limit(limit)
                    .get()
                setFeedbackData({
                    columns: TipAndTrickFeedBackColumns,
                    rows: results.docs.map(doc => {
                        const value = doc.data()
                        return {
                            id: doc.id,
                            postedByName: value.postedByName,
                            rating: value.rating,
                            reviewBody: value.reviewBody,
                            timePosted: value.timePosted.toDate().toString(),
                        }
                    })
                })
            } else {
                const _results = await firestore
                    .collection('TipsAndTricksReviews')
                    .doc(id)
                    .collection('ratings')
                    .orderBy('__name__', 'asc')
                    .limit(limit)
                    .get()
                setFeedbackData({
                    columns: TipAndTrickFeedBackColumns,
                    rows: _results.docs.map(doc => {
                        const _value = doc.data()
                        return {
                            id: doc.id,
                            postedByName: _value.postedByName,
                            rating: _value.rating,
                            reviewBody: _value.reviewBody,
                            timePosted: _value.timePosted.toDate().toString(),
                        }
                    })
                })
            }
        } catch (err) {
            setError(err.message)
        }
    }

    const fetchFeedbackAndRatings = function () {
        if (type === "service") {
            fetchServiceRatings();
        } else if (type === "tipandtrick") {
            fetchTipAndTrickRatings();
        }
    }
    useEffect(() => {
        fetchFeedbackAndRatings();
    }, [type, id])

    const handleDeleteFeedback = async function (e, doc_id) {
        e.preventDefault();
        console.log(e, doc_id, id)
        try {
            const response = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this rating and feedback.',
                icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', cancelButtonText: 'No'
            })
            if (response.isConfirmed) {
                if (type === "service") {
                    firestore.collection('ServiceDetails').doc(id).collection('ratings').doc(doc_id).delete().then(() => {
                        Swal.fire({ title: 'Success', text: 'Feedback Deleted Successfully', icon: 'success' }).then((value) => {
                            setFeedbackData({
                                columns: feedbackData.columns,
                                rows: feedbackData.rows.filter(row => row.id !== doc_id)
                            })
                        })
                    })
                } else if (type === "tipandtrick") {
                    firestore.collection('TipsAndTricksReviews').doc(id).collection('ratings').doc(doc_id).delete().then(() => {
                        Swal.fire({ title: 'Success', text: 'Feedback Deleted Successfully', icon: 'success' }).then((value) => {
                            setFeedbackData({
                                columns: feedbackData.columns,
                                rows: feedbackData.rows.filter(row => row.id !== doc_id)
                            })
                        })
                    })
                }
            } else {
                // console.log(id, doc_id, feedbackData.rows)
            }
        }
        catch (err) {

        }

        // if (type === "service") {
        //     firestore.collection('ServiceDetails').doc(id).collection('ratings').doc(doc_id).delete().then(() => {
        //         Swal.fire({ title: 'Success', text: 'Feedback Deleted Successfully', icon: 'success' }).then((value) => {
        //             setFeedbackData({
        //                 columns: feedbackData.columns,
        //                 rows: feedbackData.rows.filter(row => row.id !== doc_id)
        //             })
        //         })
        //     })
        // } else if (type === "tipandtrick") {
        //     firestore.collection('TipsAndTricksReviews').doc(id).collection('ratings').doc(doc_id).delete().then(() => {
        //         Swal.fire({ title: 'Success', text: 'Feedback Deleted Successfully', icon: 'success' }).then((value) => {
        //             setFeedbackData({
        //                 columns: feedbackData.columns,
        //                 rows: feedbackData.rows.filter(row => row.id !== doc_id)
        //             })
        //         })
        //     })
        // }

    }
    console.log(feedbackData.rows)
    return (
        <React.Fragment>
            <MDBCard className="mb-5">
                <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0">Ratings</h2>
                    {error && <MDBAlert color="danger">{error}</MDBAlert>}
                </MDBCardBody>
            </MDBCard>
            <MDBCard>
                <MDBCardBody>
                    <MDBDataTable responsive
                        bordered
                        entriesOptions={[10, 20, 25]}
                        entries={10}
                        pagesAmount={4}
                        data={{
                            columns: feedbackData.columns, rows: feedbackData.rows.map(row => {
                                return {
                                    ...row,
                                    delete: <MDBBtn onClick={(e) => handleDeleteFeedback(e, row.id)} color="danger" outline> Delete</MDBBtn>,
                                }
                            })
                        }}
                        materialSearch
                        disableRetreatAfterSorting={true}
                        onPageChange={value => {
                            if (value.activePage === value.pagesAmount)
                                setTimeout(fetchFeedbackAndRatings(), 250);
                        }}
                    />
                </MDBCardBody>
            </MDBCard>
        </React.Fragment>

    );
};
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps.match.params)
    return {

    }
}
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(RatingsAndCommentsPage);
