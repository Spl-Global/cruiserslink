import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="blue" className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center text-white">
                &copy; {new Date().getFullYear()} Copyright: Cruisers Link
            </p>
        </MDBFooter>
    );
}

export default Footer;