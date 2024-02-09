import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/" onClick={() => setIsOpen(!isOpen)}>Home</NavbarBrand>
        </Navbar>
    );
}

export default AppNavbar;