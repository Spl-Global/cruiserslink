import React, { useState } from 'react';
import logo from "../assets/cruiserslink.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBNavLink, MDBBtn, MDBNavItem, MDBContainer } from 'mdbreact';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../services/Auth'
import ClipLoader from 'react-spinners/ClipLoader'
const TopNavigation = () => {
    const { currentUser, logout } = useAuth()
    const { loading, setLoading } = useState(false)
    const history = useHistory()

    const handleLogOut = async function () {
        try {
            setLoading(true);
            await logout()
            history.push('/login')
        } catch (err) {

        }
    }
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="/" className="logo-wrapper waves-effect">
                <img alt="CruisersLink Logo" className="img-fluid" src={logo} />
            </a>

            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="tachometer-alt" className="mr-3" />
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/users" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="users" className="mr-3" />
                        Users
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/services" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="list" className="mr-3" />
                        Services
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tipsandtricks" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="lightbulb" className="mr-3" />
                        Tips And Tricks
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/ratingsandcomments" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="star" className="mr-3" />
                        Ratings
                        </MDBListGroupItem>
                </NavLink>
                <NavLink to="/settings" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="cog" className="mr-3" />
                        Settings
                    </MDBListGroupItem>
                </NavLink>
                {/* <NavLink href="#" activeClassName="activeClass"> */}
                {/* <MDBNavItem>
                    {loading ?
                        <MDBListGroupItem className="mr-3">
                            <ClipLoader size={30} color="#57A4FF" />
                        </MDBListGroupItem> :
                        <MDBListGroupItem>
                            <MDBIcon icon="sign-out-alt" className="mr-3" />
                            <a onClick href="#"> Log Out</a>
                        </MDBListGroupItem>
                    }
                </MDBNavItem> */}
                {/* </NavLink> */}
            </MDBListGroup>
        </div >
    );
}

export default TopNavigation;