import React from 'react';
import {Button, Form, Jumbotron, Navbar} from "react-bootstrap";
import '../App.css';
import axios from "axios";
import {Base64} from 'js-base64';
import NavigationController from "./NavigationController";

class AddEmploye extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.inState;
        this.addEmp = this.addEmp.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);

    }

    componentDidMount() {
        const empId = +this.props.match.params.id;
        console.log(empId);
        if (empId) {
            axios.get("http://localhost:8080/api/employees/" + empId).then(response => {
                if (response.data) {
                    this.setState(
                        {
                            employeeid: response.data.id,
                            employeeFName: response.data.firstName,
                            employeeLName: response.data.lastName,
                            employeeMail: response.data.email,
                            employeePassword: response.data.password
                        }
                    );
                }
            });

        }
    }

    inState = {
        employeeid: '',
        employeeFName: '',
        employeeLName: '',
        employeeMail: '',
        employeePassword: ''
    }

    addEmp(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitEmployee(event) {
        const Emp = {
            "firstName": this.state.employeeFName,
            "lastName": this.state.employeeLName,
            "email": this.state.employeeMail,
            "password": Base64.encode(this.state.employeePassword)
        };
        console.log(Emp);
        this.setState(() => this.inState);
        axios.post("http://localhost:8080/api/employees", Emp).then(response => {
            if (response.data) {
                this.props.history.push('/dashborad');
            }
        });
        event.preventDefault();

    }

    updateEmployee = (event) => {
        const Emp = {
            "id": this.state.employeeid,
            "firstName": this.state.employeeFName,
            "lastName": this.state.employeeLName,
            "email": this.state.employeeMail,
            "password": this.state.employeePassword
        }
        console.log(Emp);
        this.setState(() => this.inState);
        axios.put("http://localhost:8080/api/employees", Emp).then(response => {
            if (response.data) {
                this.props.history.push('/dashborad');
            }
        });
        event.preventDefault();

    }

    render() {
        const test = {
            color: 'white',
            fontSize: '40px'

        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            <h1 style={test}>{this.state.employeeid ? "Update Employee" : "Add Employee"}</h1>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <table>
                    <tbody>
                    <tr style={{width: '100rem'}}>
                        <td className="align-baseline" style={{width: '10rem'}}>
                            <div>
                                <NavigationController/>
                            </div>
                        </td>
                        <td style={{width: '90rem'}}>
                            <div>
                                <div className='d-flex justify-content-center'>
                                    <Jumbotron className='sele'>
                                        <h1 className='App'>Employee Details</h1>
                                        <Form id='addEmployeeData'
                                              onSubmit={this.state.employeeid ? this.updateEmployee : this.submitEmployee}>
                                            <Form.Group controlId='employeeFName'>
                                                <Form.Label> First Name</Form.Label>
                                                <Form.Control type="text" name='employeeFName'
                                                              placeholder="First Name" value={this.state.employeeFName}
                                                              onChange={this.addEmp} required/>
                                            </Form.Group>
                                            <Form.Group controlId='employeeLName'>
                                                <Form.Label> Last Name</Form.Label>
                                                <Form.Control type="text" name='employeeLName'
                                                              placeholder="LastName" value={this.state.employeeLName}
                                                              onChange={this.addEmp} required/>
                                            </Form.Group>
                                            <Form.Group controlId='employeeMail'>
                                                <Form.Label> Mail </Form.Label>
                                                <Form.Control type="text" name='employeeMail'
                                                              placeholder="LastName" value={this.state.employeeMail}
                                                              onChange={this.addEmp} required/>
                                            </Form.Group>
                                            <Form.Group controlId='employeeMail'>
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="text" name='employeePassword'
                                                              placeholder="LastName" value={this.state.employeePassword}
                                                              onChange={this.addEmp} required/>
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                {this.state.employeeid ? "Update" : "Submit"}
                                            </Button>
                                        </Form>
                                    </Jumbotron>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }

}

export default AddEmploye;

