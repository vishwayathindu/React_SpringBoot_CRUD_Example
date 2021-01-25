import React from 'react';
import {Button, Card, FormControl, InputGroup, Navbar, Table} from "react-bootstrap";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import NavigationController from "./NavigationController";
import Papa from 'papaparse';

toast.configure()

class Dashborad extends React.Component {
    state = {
        employees: [],
        currentpage: 1,
        usersPerpage: 5,
        csvfile: undefined
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/employees")
            .then(response => {
                const employees = response.data;
                this.setState({employees});
                console.log(this.state.employees);
            })

    }
    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const data = new FormData();
        data.append('file', this.state.csvfile);
        axios.post("http://localhost:8080/api/CSV/upload",data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(r => {
            toast.success('successful');
        });

    };

    deleteEmp = (empId) => {
        alert(empId);
        axios.delete("http://localhost:8080/api/employees/" + empId).then(r => {
            toast.success('successful');
            this.setState({
                employees: this.state.employees.filter(emp => emp.id !== empId)
            });
        });
    }
    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };
    firstPage = () => {
        if (this.state.currentpage > 1) {
            this.setState({
                currentpage: 1
            })
        }

    }
    prevPage = () => {
        if (this.state.currentpage > 1) {
            this.setState({
                currentpage: this.state.currentpage - 1
            })
        }

    }
    nextPage = () => {
        if (this.state.currentpage < Math.ceil(this.state.employees.length / this.state.usersPerpage)) {
            this.setState({
                currentpage: this.state.currentpage + 1
            })
        }

    }
    lastPage = () => {
        if (this.state.currentpage < Math.ceil(this.state.employees.length / this.state.usersPerpage)) {
            this.setState({
                currentpage: Math.ceil(this.state.employees.length / this.state.usersPerpage)
            })
        }

    }
    downloadPdf = () => {
        axios.get("http://localhost:8080/api/Report/pdf")
            .then(response => {
                toast.success('successful');
            })

    }
    downloadExcel = () => {
        axios.get("http://localhost:8080/api/Report/excel")
            .then(response => {
                toast.success('successful');
            })

    }
    downloadCsv = () => {
        axios.get("http://localhost:8080/api/Report/csv")
            .then(response => {
                toast.success('successful');
            })

    }


    render() {

        const test = {
            color: 'white',
            fontSize: '20px'

        }
        const pageNumCss = {
            width: '50px',
            textAlign: 'center'
        };
        const {employees, currentpage, usersPerpage} = this.state;
        const lastIndex = currentpage * usersPerpage;
        const firstindex = lastIndex - usersPerpage;
        const currentusers = employees.slice(firstindex, lastIndex);
        const totalPages = Math.ceil(employees.length / usersPerpage);

        return (


            <div>
                <Navbar bg="dark" variant="dark">

                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            <h1 style={test}>Welocome to Dashboad</h1>
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Navbar>
                <table>
                    <tbody>
                    <tr style={{width: '100rem'}}>
                        <td className="align-baseline" style={{width: '20rem'}}>
                            <div style={{width: '100%', margin: '0px'}}>

                                <NavigationController/>
                            </div>
                        </td>
                        <td style={{width: '80rem'}}>

                            <div className='d-flex justify-content-center'>
                                <Card style={{width: '70rem', marginTop: '10px'}}>
                                    <Card.Header className="text-center">
                                        Employee Details
                                        <div className='d-flex justify-content-end'>
                                            <Button variant="secondary"
                                                    onClick={() => this.props.history.push('/addEmploye')}>Add
                                                New Employee</Button>

                                        </div>
                                        <div className='d-flex'>
                                            <div>
                                                <Button variant="secondary"
                                                        onClick={this.downloadPdf}>Download Pdf </Button>{' '}

                                                <Button variant="secondary"
                                                        onClick={this.downloadExcel}>Download Excel</Button>{' '}

                                                <Button variant="secondary"
                                                        onClick={this.downloadCsv}>Download Csv</Button>
                                            </div>

                                        </div>
                                    </Card.Header>
                                    <Card.Body>

                                        <Table striped bordered hover>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th colSpan="2">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>


                                            {currentusers.map(emp =>
                                                <tr key={emp.id}>
                                                    <td>{emp.id}</td>
                                                    <td>{emp.firstName}</td>
                                                    <td>{emp.lastName}</td>
                                                    <td>{emp.email}</td>
                                                    <td align="center">
                                                        <Link to={"/edit/" + emp.id}><Button
                                                            variant="warning">Edit</Button> </Link>
                                                    </td>
                                                    <td align="center">
                                                        <Button variant="danger"
                                                                onClick={this.deleteEmp.bind(this, emp.id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>)}


                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div style={{"float": "left"}}>
                                            Showing page {currentpage} of {totalPages}
                                        </div>
                                        <div style={{"float": "Right"}}>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <button type="button" variant="outline-info"
                                                            disabled={currentpage === 1 ? true : false}
                                                            onClick={this.firstPage}>

                                                        First
                                                    </button>
                                                    <button type="button" variant="outline-info"
                                                            disabled={currentpage === 1 ? true : false}
                                                            onClick={this.prevPage}>
                                                        Prev
                                                    </button>
                                                </InputGroup.Prepend>
                                                <FormControl style={pageNumCss} name="currentpage" value={currentpage}
                                                             onChange={this.changePage}/>
                                                <InputGroup.Append>
                                                    <button type="button" variant="outline-info"
                                                            disabled={currentpage === totalPages ? true : false}
                                                            onClick={this.nextPage}>
                                                        Next
                                                    </button>
                                                    <button type="button" variant="outline-info"
                                                            disabled={currentpage === totalPages ? true : false}
                                                            onClick={this.lastPage}>
                                                        Last
                                                    </button>
                                                </InputGroup.Append>

                                            </InputGroup>
                                            <div>
                                                <h2>Import WHONET CSV File!</h2>
                                                    <input
                                                        className="csv-input"
                                                        type="file"
                                                        accept=".csv"
                                                        ref={input => {
                                                            this.filesInput = input;
                                                        }}
                                                        name="file"
                                                        placeholder={null}
                                                        onChange={this.handleChange}
                                                    />
                                                    <button onClick={this.importCSV}> Import now!</button>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
    )
    }

    }

    export default Dashborad;