import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import Link from 'next/link';



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark light expand="md">
                    <NavbarBrand href="/">Example</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    </Collapse>
                    <Link href='/geoanalitics'>
                        <a>Геоаналитика</a>
                    </Link>
                </Navbar>
            </div>
        );
    }
}