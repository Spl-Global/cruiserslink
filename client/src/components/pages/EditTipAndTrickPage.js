import React, { useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBAlert } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { SetTipAndTricks } from '../../Redux/actions/actions';
import { connect } from 'react-redux';
import { TipsAndTricksSubCategories, TipsAndTricksCategories } from '../../util/tipsandtricks'
import { firestore } from '../../services/base';
const EditTipAndTrick = (props) => {
    const { id } = useParams();
    const { tipsandtricks, setTipsAndTricks } = props
    const [TipAndTrickData, setTipAndTrickData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('danger')
    useEffect(() => {
        setErrorType('danger'); setError(''); setLoading(true);
        tipsandtricks.forEach(tipandtrick => {
            if (tipandtrick.id === id) {
                setTipAndTrickData(tipandtrick); setErrorType('danger'); setError(''); setLoading(false);
            }
        })
        setErrorType('danger'); setError(''); setLoading(false);
    }, [id])

    const handleChangeData = function (key, value) {
        setTipAndTrickData({
            ...TipAndTrickData,
            [key]: value
        })
    }

    const handleSubmitChange = async function (event) {
        try {
            event.preventDefault()
            setLoading(true); setError(''); setErrorType('danger');
            await firestore.collection('TipsAndTricks').doc(id).set(TipAndTrickData)
            setTipsAndTricks(tipsandtricks.map(tipandtrick => tipandtrick.id === id ? TipAndTrickData : tipandtrick))
            setLoading(false); setError('Tip And Trick Edit Successful'); setErrorType('success');
        } catch (err) {
            setLoading(false); setError(err.message); setErrorType('danger');
        }
    }

    const { category, description, subject, subcategory, anonymous } = TipAndTrickData
    return (
        <React.Fragment>
            <MDBContainer className='mt-5 text-center'>
                <MDBRow>
                    <MDBCol
                        lg='12'
                        xl='9'
                        className='text-left mx-auto float-none white z-depth-1 p-4 p-lg-5'
                    >
                        <h2 className='text-center'>Edit Tip And Trick</h2>
                        {error && <MDBAlert color={errorType}>{error}</MDBAlert>}
                        {loading ?
                            <div className='my-5 d-flex justify-content-around'>
                                <div className='spinner-border text-primary' role='status'>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            </div> :
                            <form className="mt-4">
                                <div className="md-form form-group">
                                    <select onChange={e => {
                                        handleChangeData("category", JSON.parse(e.target.value));
                                        if (TipsAndTricksSubCategories[JSON.parse(e.target.value) * 10 + 1]) {
                                            handleChangeData("subcategory", JSON.parse(e.target.value) * 10 + 1);
                                        } else {
                                            handleChangeData("subcategory", null);
                                        }
                                    }} className="form-control custom-select">
                                        {!category ?
                                            <option value={category}>Category</option> : null
                                        }
                                        {Object.keys(TipsAndTricksCategories).map(x => {
                                            return (
                                                <option key={x} value={x}>{TipsAndTricksCategories[x]}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="md-form form-group">
                                    <select
                                        onChange={e => {
                                            handleChangeData("subcategory", e.target.value ? JSON.parse(e.target.value) : e.target.value);
                                        }}
                                        className="form-control custom-select">
                                        <option value={subcategory}>SubCategory</option>
                                        {Object.keys(TipsAndTricksSubCategories).filter(y => {
                                            // console.log(y, category * 10, (category + 1) * 10)
                                            return y > category * 10 && y < (category + 100) * 10
                                        }).map(x => {
                                            return (
                                                <option key={x} value={x}>{TipsAndTricksSubCategories[x]}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <MDBInput
                                    value={subject}
                                    label='Subject'
                                    group
                                    type='text'
                                    onChange={e => {
                                        handleChangeData("subject", e.target.value);
                                    }}
                                />
                                <MDBInput
                                    value={description}
                                    label='Description'
                                    group
                                    type='textarea'
                                    rows="4"
                                    onChange={e => {
                                        handleChangeData("description", e.target.value);
                                    }}
                                />
                                {/* <div className="md-form form-group">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={anonymous}
                                        id="flexCheckDefault"
                                    />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Anonymous
                                </label>
                                </div> */}
                                <MDBBtn onClick={handleSubmitChange} color='mdb-color' className='text-xs-left'>
                                    Update
                                </MDBBtn>
                            </form>
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        tipsandtricks: state.tipsandtricksReducer.tipsandtricks
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTipsAndTricks: function (tipsandtricks) {
            dispatch(SetTipAndTricks(tipsandtricks))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTipAndTrick);