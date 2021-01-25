import React from "react";
import './App.css';
import Welcome from "./components/Welcome";
import Dashborad from "./components/Dashborad";
import AddEmploye from "./components/AddEmploye";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

    return (

        <div>

            <Router>

                <Switch>
                    <Route path='/' exact component={Welcome}></Route>
                    <Route path='/dashborad' exact component={Dashborad}></Route>
                    <Route path='/addEmploye' exact component={AddEmploye}></Route>
                    <Route path='/edit/:id' exact component={AddEmploye}></Route>
                </Switch>
            </Router>

        </div>

    );
}

export default App;
