import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Utils from "./Utils";
import {ErrorDialog} from "./driven/ErrorDialog";
import {AlertDialog} from "./driven/AlertDialog";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Fab from "@material-ui/core/Fab/Fab";
import moment from "moment";
import {CopyrightFooter} from "./driven/CopyrightFooter";
import {TitleBar} from "./TitleBar";
import ActionLinker from "./ActionLinker";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import CheckInIcon from "@material-ui/icons/ArrowUpward";
import {FormModal} from "./driven/FormModal";
import Select from "react-select";
import {Link} from "react-router-dom";

import EditIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import NotFound from './NotFound';



class Athlete extends Component {

    componentDidMount() {  // this event is triggered on initial page load
        this.props.functions.setCurrentPage(`/athlete/${this.props.match.params.id}`);
        this.refreshAthlete();
        this.props.functions.fetchSchools(() => {
            this.props.functions.setLoading(false);
        }, () => {
            this.props.functions.setLoading(false);
            this.props.functions.setErrorMsg("Failed to get school data.");
            this.props.functions.setError(true);
        }); 
    }

    refreshAthlete() {
        if (this.props.match.params.hasOwnProperty("id")){
            this.props.functions.fetchAthlete(this.props.match.params.id, (athlete) => {
                this.props.functions.fetchSchool(Utils.getIDfromURL(athlete.school), (school) => {
                    this.props.athlete.athlete.school = school;
                    this.props.functions.setLoading(false);
                }, () => {
                    this.props.functions.setLoading(false);
                    this.props.functions.setErrorMsg("Failed to get athlete school data.");
                    this.props.functions.setError(true);
                })
            }, () => {
                this.props.functions.setLoading(false);
                this.props.functions.setErrorMsg("Failed to get athlete data.");
                this.props.functions.setError(true);
            })
        }
    }

    getSchoolOptions() {
        if (this.props.hasOwnProperty("school") && this.props.school.hasOwnProperty("schools") && this.props.school.schools.length > 0) {
            let schools = [];
            for (let schoolIndex = 0; schoolIndex < this.props.school.schools.length; schoolIndex++) {
                schools.push({value: this.props.school.schools[schoolIndex], label: this.props.school.schools[schoolIndex].town, input: "school", props: this.props});
            }
            return schools;
        }
        return [];
    }

    handleSelectorChange(event) {
        let athleteItem = Object.assign({}, event.props.athlete.athlete); // deep copy
        switch (event.input) {
            case 'school':
                athleteItem.school = event;
                break;
            default:
                console.error(event);
                break;
        }
        event.props.functions.setCurrentAthlete(athleteItem);
    }

    handleValueChange(event) {
        let athleteItem = Object.assign({}, this.props.athlete.athlete); // deep copy
        switch (event.target.id) {
            case 'athlete-first-name':
                athleteItem.firstName = event.target.value;
                break;
            case 'athlete-last-name':
                athleteItem.lastName = event.target.value;
                break;
            case 'athlete-grad-year':
                athleteItem.gradYear = event.target.value;
                break;
            default:
                console.error(event);
                break; // do nothing
        }
        this.props.functions.setCurrentAthlete(athleteItem);
    }

    render() {
        console.log(this.props);
        if (this.props.navigation.loading) {
            return (<Grid item container xs={12} justify={"center"}><CircularProgress style={{margin: 16}} variant={"indeterminate"}/></Grid>) // show nothing if we are loading
        } else if (!this.props.athlete.athlete.hasOwnProperty('url')){            
            return <NotFound/>
        } else {
            const athlete = this.props.athlete.athlete;
            return (
                <Grid container direction='row' justify="center" alignItems='center'
                      style={{minWidth: 950}}>
                    {/*ERROR DIALOG*/}
                    <ErrorDialog message={this.props.error.errorMsg}
                                 open={this.props.error.isError}
                                 onClose={() => {
                                     this.props.functions.setError(false);
                                 }}/>

                    {/*ALERT DIALOG*/}
                    <AlertDialog message={this.props.alert.alertMsg}
                        open={this.props.alert.isAlert}
                        onClose={() => {
                            this.props.functions.setAlert(false);
                    }}/>

                    <Grid>

                        {/*ADD ATHLETE BUTTON*/}
                        {this.props.auth.isAuthenticated ? 
                        <Fragment>
                            <Tooltip title={"Edit Athlete"} placement={"bottom"}>
                                <Fab style={{marginTop: 8}}
                                    type={"button"}
                                    // variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        // console.log("open modal");
                                        this.props.functions.setAthleteModal(true);
                                    }}
                                >
                                    <EditIcon/>
                                </Fab>
                            </Tooltip> 
                            <Tooltip title={"Delete Athlete"} placement={"bottom"}>
                                <Fab style={{marginTop: 8}}
                                    type={"button"}
                                    // variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        if (window.confirm("WARNING! Are you absolutely sure you want to remove athlete?  This will remove them from all rosters and delete any results/statistics they may have!")) {
                                            this.props.functions.deleteAthlete(this.props.athlete.athlete);
                                            window.location.reload(); // Reload page
                                        }

                                    }}
                                >
                                    <ClearIcon/>
                                </Fab>
                            </Tooltip>
                        </Fragment>

                        : "" }


                        <h3>{athlete.firstName + " " + athlete.lastName}</h3>
                        <h5>{athlete.hasOwnProperty('school') ? athlete.school.town : ""} class of {athlete.gradYear}</h5>
                    
                    
                    
                        {/*==================*/}
                        {/*EDIT ATHLETE FORM*/}
                        {/*==================*/}
                        <FormModal open={this.props.navigation.athleteModal} label={"Edit Athlete"} close={() => {
                            this.props.functions.setAthleteModal(false);
                        }}>
                            <form noValidate autoComplete="off" onSubmit={event => {
                                event.preventDefault(); // stop page reload

                                // deep copy our athlete object
                                let athlete = Object.assign({}, this.props.athlete.athlete);
                                // fix url fields

                                // validate
                                if (!athlete.hasOwnProperty("firstName")) {
                                    this.props.functions.setErrorMsg("Must enter a first name.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (athlete.firstName === null || athlete.firstName === '') {
                                    this.props.functions.setErrorMsg("Must enter a first name.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (!athlete.hasOwnProperty("lastName")) {
                                    this.props.functions.setErrorMsg("Must enter a last name.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (athlete.lastName === null || athlete.lastName === '') {
                                    this.props.functions.setErrorMsg("Must enter a last name.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (!athlete.hasOwnProperty("gradYear")) {
                                    this.props.functions.setErrorMsg("Must enter a grad year.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (athlete.gradYear === null || athlete.gradYear === '') {
                                    this.props.functions.setErrorMsg("Must enter a grad year.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (athlete.gradYear > 2100 || athlete.gradYear < 1800) {
                                    this.props.functions.setErrorMsg("Invalid year.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (!athlete.hasOwnProperty("school")) {
                                    this.props.functions.setErrorMsg("Must choose a school.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                if (athlete.school === null || athlete.school === '') {
                                    this.props.functions.setErrorMsg("Must choose a school.");
                                    this.props.functions.setError(true);
                                    return;
                                }

                                athlete["firstName"] = this.props.athlete.athlete.firstName;
                                athlete["lastName"] = this.props.athlete.athlete.lastName;
                                athlete["gradYear"] = this.props.athlete.athlete.gradYear;
                                athlete["school"] = this.props.athlete.athlete.school.hasOwnProperty('value') ? this.props.athlete.athlete.school.value : this.props.athlete.athlete.school;

                                this.props.functions.fetchSchool(Utils.getIDfromURL(athlete["school"].url), school => {
                                    athlete["school"] = school.url;

                                    // call database and save team
                                    this.props.functions.saveAthlete(athlete, () => {
                                        this.refreshAthlete(); // refresh athlete list
                                        this.props.functions.setAthleteModal(false); // close modal window
                                        this.props.functions.setAddAthleteModal(false); // close modal window

                                        this.props.functions.setAlertMsg("Athlete saved!");
                                        this.props.functions.setAlert(true); // open alert modal
                                        setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically

                                    }, error => {
                                        if (error.response && error.response.status == 401) {
                                            this.props.functions.setErrorMsg(error.response.data.detail);
                                            this.props.functions.setError(true); // open error modal
                                        } else {
                                            this.props.functions.setErrorMsg("Failed to get athlete data. Please check internet connection and refresh page.");
                                            this.props.functions.setError(true); // open error modal
                                            this.props.functions.setAthleteModal(false); // close modal window
                                        }
                                    })
                                }, error => {
                                    // if school is NOT found
                                    this.props.functions.setErrorMsg("Failed to find school. Please check internet connection and refresh page.");
                                    this.props.functions.setError(true); // open error modal
                                });

                            }}>
                                {/*FIRST NAME*/}
                                <div>
                                    <Tooltip title={"First Name"} placement={"right"}>
                                        <TextField
                                            id='athlete-first-name'
                                            label={"First Name"}
                                            type={"text"}
                                            fullWidth
                                            value={this.props.athlete.athlete.hasOwnProperty('firstName') && this.props.athlete.athlete.firstName !== null ? this.props.athlete.athlete.firstName : ""}
                                            onChange={event => {
                                                this.handleValueChange(event);
                                            }}
                                        />
                                    </Tooltip>
                                </div>

                                {/*LAST NAME*/}
                                <div>
                                    <Tooltip title={"Last Name"} placement={"right"}>
                                        <TextField
                                            id='athlete-last-name'
                                            label={"Last Name"}
                                            type={"text"}
                                            fullWidth
                                            value={this.props.athlete.athlete.hasOwnProperty('lastName') && this.props.athlete.athlete.lastName !== null ? this.props.athlete.athlete.lastName : ""}
                                            onChange={event => {
                                                this.handleValueChange(event);
                                            }}
                                        />
                                    </Tooltip>
                                </div>

                                {/*SCHOOL*/}
                                <div>
                                    <FormControl fullWidth={true}>
                                        <FormHelperText>School</FormHelperText>
                                        <Select
                                            onChange={this.handleSelectorChange}
                                            options={this.getSchoolOptions()}
                                            defaultValue={{ label: this.props.athlete.athlete.hasOwnProperty('school') ? this.props.athlete.athlete.school.hasOwnProperty('town') ? this.props.athlete.athlete.school.town : "Select an Option..." : "Select an Option...", value: this.props.athlete.athlete.hasOwnProperty('school') ? this.props.athlete.athlete.school : null}}
                                        />
                                    </FormControl>
                                </div>

                                {/*GRAD YEAR*/}
                                <Tooltip title={"Grad Year"} placement={"right"}>
                                    <TextField
                                        id='athlete-grad-year'
                                        label={"Graduation Year"}
                                        type={"number"}
                                        fullWidth
                                        value={this.props.athlete.athlete.hasOwnProperty('gradYear') && this.props.athlete.athlete.gradYear !== null ? this.props.athlete.athlete.gradYear : ""}
                                        onChange={event => {
                                            this.handleValueChange(event);
                                        }}
                                    />
                                </Tooltip>

                                {/*SAVE BUTTON*/}
                                <Tooltip title={"Save Athlete"} placement={"right"}>
                                    <Fab style={{marginTop: 8}}
                                        type="submit"
                                        // variant="contained"
                                        color="secondary"
                                    >
                                        <SaveIcon/>
                                    </Fab>
                                </Tooltip>
                            </form>
                        </FormModal>
                    </Grid>

                    <CopyrightFooter/>
                </Grid>
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        navigation: state.navigation,
        error: state.error,
        alert: state.alert,
        school: state.school,
        option: state.option,
        team: state.team,
        athlete: state.athlete,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        functions: ActionLinker.getAllFunctions(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Athlete);