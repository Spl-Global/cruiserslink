import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink, MDBAlert } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { firestore } from '../../services/base';
import { ServiceFeedBackColumns, TipAndTrickFeedBackColumns } from '../../util/feedback'
import { connect } from 'react-redux';
const RatingsAndCommentsPage = () => {
    function testClickEvent(param) {
        console.log(param);
    }
    const limit = 25;
    const { type, id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [feedbackData, setFeedbackData] = useState({ columns: type === "service" ? ServiceFeedBackColumns : TipAndTrickFeedBackColumns, rows: [] })
    // console.log(type, id)
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
                            delete: <MDBLink className="text-primary p-0" to="#"> Delete</MDBLink >,
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
                            delete: <MDBLink className="text-primary p-0" to="#">Delete</MDBLink >,
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
                            delete: < MDBLink className="text-primary p-0" to="#"> Delete</MDBLink >,
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
                            delete: < MDBLink className="text-primary p-0" to="#">Delete</MDBLink >,
                        }
                    })
                })
            }
        } catch (err) {
            setError(err.message)
        }
    }
    useEffect(() => {
        if (type === "service") {
            fetchServiceRatings();
        } else if (type === "tipandtrick") {
            fetchTipAndTrickRatings();
        }
    }, [type, id])
    // console.log(feedbackData)
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
                        data={feedbackData}
                        materialSearch
                    />
                </MDBCardBody>
            </MDBCard>
        </React.Fragment>

    );
};
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.match.params)
    return {

    }
}
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(RatingsAndCommentsPage);
