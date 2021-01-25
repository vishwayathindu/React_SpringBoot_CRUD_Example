import React from 'react';
import {Button, Form, Jumbotron, Navbar} from "react-bootstrap";
import '../App.css';
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.istate;
        this.loginChange = this.loginChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    istate = {userName: '', password: ''};

    submitLogin(event) {
        const url = this.state.userName + '/' + this.state.password;
        this.setState(() => this.istate);
        axios.post("http://localhost:8080/api/employees/login/" + url).then(response => {
            if (response.data === 'success') {
                toast.success('successful');
                this.props.history.push('/dashborad');

            } else {
                toast.error('login fail');
            }
        });

        event.preventDefault();
    }

    loginChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const test = {
            color: 'white',
            fontSize: '70px'

        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">

                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            <h1 style={test}>Welocome to Login</h1>
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Navbar>

                <div className='d-flex justify-content-center'>
                    <Jumbotron className='sele'>
                        <h1 className='App'>Log In</h1>
                        <Form id='loginId' onSubmit={this.submitLogin}>
                            <Form.Group controlId='formUserName'>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" name='userName'
                                              placeholder="User name" value={this.state.userName}
                                              onChange={this.loginChange} required/>
                                <Form.Text className="text-muted">
                                    We'll never share your User name with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='formPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Password"
                                              value={this.state.password}
                                              onChange={this.loginChange} required/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Jumbotron>
                </div>
            </div>

        );
    }

}

export default Welcome;