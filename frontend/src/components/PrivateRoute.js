import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return (<Grid item container xs={12} justify={"center"}><CircularProgress style={{margin: 16}} variant={"indeterminate"}/></Grid>) // show nothing if we are loading
            } else if (!auth.isAuthenticated) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);