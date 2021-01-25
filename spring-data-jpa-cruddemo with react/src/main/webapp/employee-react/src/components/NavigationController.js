import React from 'react';
import {Nav,ListGroup} from "react-bootstrap";



class NavigationController extends React.Component {

    render() {

        return (
            <div   >

                    <Nav defaultActiveKey="/dashborad" className="flex-column" justify variant="tabs">
                    <Nav.Link href="/addEmploye">Add Employee</Nav.Link>
                    <Nav.Link href="/dashborad">Dashbord</Nav.Link>
                    <Nav.Link href="/">log out</Nav.Link>
                    </Nav>

            </div>

        )

    }

}

export default NavigationController;