import React from 'react'
import { connect } from 'react-redux'
import { MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import logo from "../../assets/cruiserslink.png";
class EmptyPage extends React.Component {
  constructor(props) {
      super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <React.Fragment>
        <MDBContainer className='d-flex h-100 justify-content-center flex-column'>
          <MDBRow>
            <MDBCol
              md='12'
              lg='10'
              xl="8"
              className='mx-auto float-none white z-depth-1 p-4 px-lg-5'
            >
              <div className="d-sm-flex align-items-center">
                <div>
                  <img className="img-fluid" width="200" src={logo}/>
                  <h2 className="h2-responsive mt-3 mb-2">404. That's an error.</h2>
                  <h4>The requested URL was not found on this server.</h4>
                  <h5>Go to <a href="/" className="text-primary">Home Page</a></h5>
                </div>
                <img alt="Error 404" className="img-fluid d-none d-sm-block" width="200" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    )
  }
}
const mapStateToProps = null
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(EmptyPage)