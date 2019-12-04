import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import * as authActions from '../actions/AuthActions';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from '@material-ui/core';
import {TitleBar} from "./TitleBar";

import ActionLinker from "./ActionLinker";
import { ErrorDialog } from './driven/ErrorDialog';
import {AlertDialog} from "./driven/AlertDialog";


class Register extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        password2: ""
      };
    
      onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (username == "" || email == "" || password == "" || password2 == ""){
            this.props.functions.setError(true);
            this.props.functions.setErrorMsg("All fields must be completed!");
        }
        else if (password !==  password2) {
            this.props.functions.setError(true);
            this.props.functions.setErrorMsg("Passwords do not match!");
        } else {
            const newUser = {
                username,
                email,
                password
            };
            this.props.functions.register(newUser);
        }
      };
    
      onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { username, email, password, password2 } = this.state;
        return (

            <Grid container direction='row' justify="center" alignItems='center' spacing={10}
            style={{minWidth: 950}}>

                <ErrorDialog message={this.props.error.errorMsg} open={this.props.error.isError} onClose={() => {
                    this.props.functions.setError(false);
                }}/>

                {/*ALERT DIALOG*/}
                <AlertDialog message={this.props.alert.alertMsg}
                    open={this.props.alert.isAlert}
                    onClose={() => {
                        this.props.functions.setAlert(false);
                }}/>

                <form onSubmit={this.onSubmit}>

                <TextField
                        name="email"
                        type="text"
                        id="email-field"
                        placeholder="Email"
                        onChange={this.onChange}
                        value={email}
                    />

                    <TextField
                        name="username"
                        type="text"
                        id="email-field"
                        placeholder="Username"
                        onChange={this.onChange}
                        value={username}
                    />

                    <br/>

                    <TextField
                        name="password"
                        type="password"
                        id="password-field"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={password}
                    />

                    <TextField
                        name="password2"
                        type="password"
                        id="password-field"
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        value={password2}
                    /> 

                    <br/>

                    <button type="submit" className="btn btn-primary">Create New User</button>
                </form>


            </Grid>

        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        error: state.error,
        alert: state.alert,
        navigation: state.navigation
    }
};


const mapDispatchToProps = dispatch => {
    return {
        functions: ActionLinker.getAllFunctions(dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);