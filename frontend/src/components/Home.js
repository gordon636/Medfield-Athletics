import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import GoogleTooltip from "@material-ui/core/Tooltip/Tooltip";
import Utils from "./Utils";
import {ErrorDialog} from "./driven/ErrorDialog";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Fab from "@material-ui/core/Fab/Fab";
import moment from "moment";
import {CopyrightFooter} from "./driven/CopyrightFooter";
import {TitleBar} from "./TitleBar";
import ActionLinker from "./ActionLinker";
import * as authActions from '../actions/AuthActions';
import {AlertDialog} from "./driven/AlertDialog";



class Home extends Component {

    componentDidMount() {  // this event is triggered on initial page load
        this.props.functions.setCurrentPage("/home");
        Utils.setWindowWidth(window.innerWidth);
    }

    render() {

        return(
            <Grid container direction='row' justify="center" alignItems='center' spacing={10}
                  style={{minWidth: 950}}>

                    {/*ALERT DIALOG*/}
                    <AlertDialog message={this.props.alert.alertMsg}
                                 open={this.props.alert.isAlert}
                                 onClose={() => {
                                     this.props.functions.setAlert(false);
                                    }
                    }/>

                    <h1>HOME</h1>
                <CopyrightFooter/>
            </Grid>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        alert: state.alert,
        navigation: state.navigation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        functions: ActionLinker.getAllFunctions(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);