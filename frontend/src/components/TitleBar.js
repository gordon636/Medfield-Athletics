import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import { logout } from '../actions/AuthActions';

import RostersIcon from "@material-ui/icons/PermIdentity";

export class TitleBar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        
        const authLinks = (
            <ul>
                <span><strong>{user ? "Welcome, " + user.username : ""}</strong></span>
                <Button onClick={() => this.props.logout()}>Logout</Button>
                <Button><Link to='/register'>Create New User</Link></Button>
            </ul>

        );

        const guestLinks = (
            <ul>
                <Link to='/login' style={{marginLeft: 32}}>Login</Link>
            </ul>

        );

        return (
            <Grid item xs={12}>
                <AppBar position="static" color="default" style={{marginBottom: 16, marginLeft: 6, marginTop: 8}}>
                    <Toolbar>

                        <Tooltip title={"Teams"} placement={"bottom"}>
                            <Link to='/team' style={{marginLeft: 32}}>
                                <RostersIcon color={"primary"} style={{fontSize: 30}}/>
                            </Link>
                        </Tooltip>

                        {/*Title*/}
                        <Typography align={"center"} variant="h6" style={{flexGrow: 1, marginRight: 64}}>
                            {this.props.title}
                        </Typography>

                        { isAuthenticated ? authLinks : guestLinks }
                    </Toolbar>
                </AppBar>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
     return {
         auth: state.auth
     }
 }


export default connect(mapStateToProps, { logout })(TitleBar);