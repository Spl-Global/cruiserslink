import React from 'react'
import { connect } from 'react-redux'
class EmptyPage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return (
            <div></div>
        )
    }
}
const mapStateToProps = null
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(EmptyPage)