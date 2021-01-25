import React, { Component } from 'react';
import logo from "../assets/cruiserslink.png";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="lg" scrolling>
                <MDBNavbarBrand href="/" className="d-block d-lg-none">
                    <img alt="CruisersLink Logo" className="img-fluid" src={logo} width="150"/>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left className="d-block d-lg-none">
                        <MDBNavItem>
                            <MDBNavLink activeClassName="active" exact={true} to="/">
                            <MDBIcon fas icon="tachometer-alt" className="mr-2"/>Dashboard
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/users">
                                <MDBIcon fas icon="users" className="mr-2"/>Users
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink activeClassName="active" className="nav-link Ripple-parent" to="/settings">
                                <MDBIcon fas icon="cog" className="mr-2"/>Settings
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink activeClassName="active"  className="nav-link Ripple-parent" to="/login">
                                <MDBIcon fas icon="sign-in-alt" className="mr-2"/>Login
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <a className="nav-link Ripple-parent" href="#"><MDBIcon fas icon="sign-out-alt" className="mr-2"/>Logout</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;