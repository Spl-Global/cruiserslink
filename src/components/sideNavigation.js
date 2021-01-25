import React from 'react';
import logo from "../assets/cruiserslink.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="/" className="logo-wrapper waves-effect">
                <img alt="CruisersLink Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="tachometer-alt" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/users" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="users" className="mr-3"/>
                        Users
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/services" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="list" className="mr-3"/>
                        Services
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/subcategory" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="list" className="mr-3"/>
                        Subcategory
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/settings" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="cog" className="mr-3"/>
                        Settings
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/login" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="sign-in-alt" className="mr-3"/>
                        Login
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/forgot-password" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="lock" className="mr-3"/>
                        Forgot Password
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;