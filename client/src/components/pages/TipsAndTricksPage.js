import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBBadge, MDBLink } from 'mdbreact';
import { TipsAndTricksCategories, TipsAndTricksColumns, TipsAndTricksSubCategories, } from '../../util/tipsandtricks'
import { connect } from 'react-redux'
import { SetTipAndTricks } from '../../Redux/actions/actions'
import { firestore } from '../../services/base';
const TipsAndTricksPage = (props) => {
    const limit = 25;
    const { tipsandtricks, setTipsAndTricks } = props
    const [data, setData] = useState({ columns: TipsAndTricksColumns, rows: [] })
    const [error, setError] = useState('')
    function testClickEvent(param) {
        console.log(param);
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
                    avgRating: tipandtrick.avgRating,
                    numRating: tipandtrick.numRating,
                    _rating_: <MDBLink className="text-primary p-0" to={`/ratingsandcomments/tipandtrick/${tipandtrick.id}`}>View Ratings</MDBLink>,
                    edit: <MDBLink className="text-primary p-0" to={`/edit_tipandtrick/${tipandtrick.id}`}>Edit</MDBLink>,
                    // delete: < MDBLink className="text-danger p-0" to="#">Delete</MDBLink >,
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
            <MDBCard>
                <MDBCardBody>
                    <MDBDataTable
                        responsive
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
