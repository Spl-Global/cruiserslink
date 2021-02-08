import React, { Component, useState } from 'react';
import logo from "../assets/cruiserslink.png";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { useAuth } from '../services/Auth';
import { useHistory } from 'react-router-dom';

const TopNavigation = () => {
    const state = {
        collapse: false,
        dropdownOpen: false,
    }
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const handleSignOut = async function (event) {
        try {
            event.preventDefault()
            await logout()
            history.push('/login')
        } catch (err) {

        }
    }
    const [collapse, setCollapse] = useState(false)
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const onClick = () => {
        setCollapse(!collapse)
    }
    const toggle = () => {
        setDropDownOpen(!dropdownOpen)
    }
    return (
        <MDBNavbar className="flexible-navbar" light expand="lg" scrolling>
            <MDBNavbarBrand href="/" className="d-block d-lg-none">
                <img alt="CruisersLink Logo" className="img-fluid" src={logo} width="150" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={onClick} />
            <MDBCollapse isOpen={collapse} navbar>
                <MDBNavbarNav left className="d-block d-lg-none">
                    <MDBNavItem>
                        <MDBNavLink activeClassName="active" exact={true} to="/">
                            <MDBIcon fas icon="tachometer-alt" className="mr-2" />Dashboard
                            </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/users">
                            <MDBIcon fas icon="users" className="mr-2" />Users
                            </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/services">
                            <MDBIcon fas icon="list" className="mr-2" />Services
                            </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/tipsandtricks">
                            <MDBIcon fas icon="lightbulb" className="mr-2" />Tips And Tricks
                            </MDBNavLink>
                    </MDBNavItem>
                    {/* <MDBNavItem>
                        <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/ratingsandcomments">
                            <MDBIcon fas icon="star" className="mr-2" />Ratings
                            </MDBNavLink>
                    </MDBNavItem> */}
                    <MDBNavItem>
                        <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/settings">
                            <MDBIcon fas icon="cog" className="mr-2" />Settings
                            </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <a onClick={handleSignOut} className="nav-link Ripple-parent" href="#"><MDBIcon fas icon="sign-out-alt" className="mr-2" />Logout</a>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default TopNavigation;