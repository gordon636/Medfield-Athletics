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
import { ErrorDialog } from './driven/ErrorDialog';

import ActionLinker from "./ActionLinker";

class Login extends Component {
    state = {
        username: "",
        password: ""
      };
    
      onSubmit = e => {
        e.preventDefault();
        this.props.functions.login(this.state.username, this.state.password);
      };
    
      onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to={this.props.navigation.currentPage}/>
        }
        const { username, password } = this.state;
        return (

            <Grid container direction='row' justify="center" alignItems='center' spacing={10}
            style={{minWidth: 950}}>

                <ErrorDialog message={this.props.error.errorMsg} open={this.props.error.isError} onClose={() => {
                    this.props.functions.setError(false);
                }}/>

                <form onSubmit={this.onSubmit}>

                    <TextField
                        name="username"
                        type="text"
                        id="email-field"
                        placeholder="Email"
                        onChange={this.onChange}
                    />

                    <br/>

                    <TextField
                        name="password"
                        type="password"
                        id="password-field"
                        placeholder="Password"
                        onChange={this.onChange}
                    />

                    <br/>

                    <button type="submit" className="btn btn-primary">Login</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);