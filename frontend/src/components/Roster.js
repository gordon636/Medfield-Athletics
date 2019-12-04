import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
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

import NotFound from './NotFound';

import ViewIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";



class Roster extends Component {

    componentDidMount() {  // this event is triggered on initial page load
        this.props.functions.setCurrentPage(`/roster/${this.props.match.params.id}`);
        this.props.functions.setLoading(true);

        if (this.props.match.params.hasOwnProperty("id")){
            this.props.functions.fetchAthletesByTeam(this.props.match.params.id, () => {
                this.props.functions.fetchSchools(() => {
                    this.props.functions.fetchTeam(this.props.match.params.id, () => {
                        this.props.functions.fetchAthletesBySchool(Utils.getIDfromURL(this.props.team.team.school.url), () => {
                            this.props.functions.setLoading(false);
                        }, () => {
                            this.props.functions.setLoading(false);
                            this.props.functions.setErrorMsg("Failed to get athletes. Please check internet connection and refresh page.");
                            this.props.functions.setError(true);
                        });                     
                    }, () => {
                        this.props.functions.setLoading(false);
                        this.props.functions.setErrorMsg("Failed to get athletes. Please check internet connection and refresh page.");
                        this.props.functions.setError(true);
                    }); 
                }, () => {
                    this.props.functions.setLoading(false);
                    this.props.functions.setErrorMsg("Failed to get schools. Please check internet connection and refresh page.");
                    this.props.functions.setError(true);
                });
            }, () => {
                this.props.functions.setLoading(false);
                this.props.functions.setErrorMsg("Failed to get roster. Please check internet connection and refresh page.");
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

    getAthleteOptions() {
        if (this.props.hasOwnProperty("athlete") && this.props.athlete.hasOwnProperty("athletes") && this.props.athlete.athletes.length > 0) {
            let athletes = [];

            // List of athlete id's on team
            let rosterAthleteIDs = this.props.athlete.rosterAthletes.map(athlete => {
                return Utils.getIDfromURL(athlete.athlete.url);
            });

            // Filter out athletes already on team
            let filteredAthletes = this.props.athlete.athletes.filter(athlete => {
                return rosterAthleteIDs.includes(Utils.getIDfromURL(athlete.url)) ? null : athlete.gradYear < this.props.team.team.year ? null : athlete;
            })

            // Create React Select list
            for (let athleteIndex = 0; athleteIndex < filteredAthletes.length; athleteIndex++) {
                athletes.push({value: filteredAthletes[athleteIndex], label: filteredAthletes[athleteIndex].firstName + " " + filteredAthletes[athleteIndex].lastName + " (" + filteredAthletes[athleteIndex].gradYear + ")", input: "athlete", props: this.props});
            }
            return athletes;
        }
        return [];
    }

    refreshAthletes() {
        this.props.functions.setLoading(true);
        this.props.functions.fetchAthletesBySchool(Utils.getIDfromURL(this.props.team.team.school.url), () => {
            this.props.functions.setLoading(false);
        }, () => {
            this.props.functions.setLoading(false);
            this.props.functions.setErrorMsg("Failed to get athletes. Please check internet connection and refresh page.");
            this.props.functions.setError(true);
        });
    }

    refreshRoster() {
        this.props.functions.setLoading(true);
        this.props.functions.fetchAthletesByTeam(this.props.match.params.id, () => {
            this.props.functions.setLoading(false);
        }, () => {
            this.props.functions.setLoading(false);
            this.props.functions.setErrorMsg("Failed to get athletes. Please check internet connection and refresh page.");
            this.props.functions.setError(true);
        });
    }

    removeRosterAthlete(athlete) {
        this.props.functions.removeRosterAthlete(athlete, () => {
            this.refreshRoster();
            this.props.functions.setAlertMsg("Athlete removed from Team!");
            this.props.functions.setAlert(true); // open alert modal
            setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically
        }, error => {
            if (error.response && error.response.status == 401) {
                this.props.functions.setErrorMsg(error.response.data.detail);
                this.props.functions.setError(true); // open error modal
                this.props.functions.setTeamModal(false); // close modal window
            } else {
                this.props.functions.setErrorMsg("Failed to remove athlete. Please check internet connection and refresh page.");
                this.props.functions.setError(true); // open error modal
                this.props.functions.setTeamModal(false); // close modal window
            }
        })
    }

    handleSelectorChange(event) {
        let athleteItem = Object.assign({}, event.props.athlete.athlete); // deep copy
        let rosterAthleteItem = Object.assign({}, event.props.athlete.rosterAthlete); // deep copy
        switch (event.input) {
            case 'school':
                athleteItem.school = event;
                break;
            case 'athlete':
                rosterAthleteItem.athlete = event.value;
                break;
            default:
                console.error(event);
                break;
        }
        event.props.functions.setCurrentAthlete(athleteItem);
        event.props.functions.setRosterAthlete(rosterAthleteItem);
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

    handleCheckboxChange(event) {
        let rosterAthleteItem = Object.assign({}, this.props.athlete.rosterAthlete); // deep copy

        switch (event.target.id) {
            case 'roster-athlete-captain':
                rosterAthleteItem.captain = event.target.checked;
                break;
            default:
                console.error(event);
                break; // do nothing
        }
        this.props.functions.setRosterAthlete(rosterAthleteItem);
    }

    render() {
        if (this.props.navigation.loading) {
            return (<Grid item container xs={12} justify={"center"}><CircularProgress style={{margin: 16}} variant={"indeterminate"}/></Grid>) // show nothing if we are loading
        } else if (!this.props.team.team.hasOwnProperty('url')){            
            return <NotFound/>
        } else {
            const team = this.props.team.team;
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
                        <h3>{team.hasOwnProperty('school') ? team.school.town : ""} {team.hasOwnProperty('school') ? team.school.mascot : ""}</h3>
                        <h5>{team.level + " " + team.sport + " - " + team.year}</h5>

                        {/*ADD ATHLETE BUTTON*/}
                        {this.props.auth.isAuthenticated ? 
                            <Tooltip title={"Add Athlete"} placement={"bottom"}>
                                <Fab style={{marginTop: 8}}
                                    type={"button"}
                                    // variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        // console.log("open modal");
                                        this.props.functions.setCurrentAthlete({});
                                        this.props.functions.setAddAthleteModal(true);
                                    }}
                                >
                                    <AddIcon/>
                                </Fab>
                            </Tooltip> 
                        : "" }

                        {/*TEAMS TABLE*/}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Grade</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.athlete.rosterAthletes.map((athlete, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{athlete.athlete.firstName+ " " + athlete.athlete.lastName}{athlete.captain == 1 ? " (C)" : ""}</TableCell>
                                        <TableCell>{athlete.athlete.gradYear}</TableCell>
                                        <TableCell>
                                            <Tooltip title={"View Athlete"} placement={"bottom"}>
                                            <Link to={`/athlete/` + Utils.getIDfromURL(athlete.athlete.url)} style={{marginLeft: 32}}>
                                                <ViewIcon color={"primary"} style={{fontSize: 30}}/>
                                            </Link>
                                            </Tooltip>
                                            {this.props.auth.isAuthenticated ? 
                                                <Fragment>
                                                    <Tooltip title={"Edit Roster Spot"} placement={"bottom"}>
                                                        <EditIcon color={"primary"} style={{fontSize: 30}}
                                                            type={"button"}
                                                            onClick={() => {
                                                                this.props.functions.setRosterAthlete(athlete);
                                                                this.props.functions.setAddAthleteModal(true);
                                                        }}/>
                                                    </Tooltip>
                                                    <Tooltip title={"Remove from team"} placement={"bottom"}>
                                                        <ClearIcon color={"primary"} style={{fontSize: 30}}
                                                        onClick={() => {
                                                            if (window.confirm("Are you absolutely sure you want to remove athlete?")) {
                                                                this.removeRosterAthlete(athlete);
                                                            }
                                                        }}/>
                                                    </Tooltip>
                                                </Fragment>
                                            : ""}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                    {/*==================*/}
                    {/*ADD ATHLETE FORM*/}
                    {/*==================*/}
                    <FormModal open={this.props.navigation.addAthleteModal} label={"Add/Edit Roster Spot"} close={() => {
                        this.props.functions.setAddAthleteModal(false);
                    }}>
                        <form noValidate autoComplete="off" onSubmit={event => {
                            event.preventDefault(); // stop page reload

                            // deep copy our roster athlete object
                            let rosterAthlete = Object.assign({}, this.props.athlete.rosterAthlete);

                            // validate
                            if (!rosterAthlete.athlete) {
                                this.props.functions.setErrorMsg("Must choose an athlete.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (rosterAthlete.athlete === null || rosterAthlete.athlete === '') {
                                this.props.functions.setErrorMsg("Must choose an athlete.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!rosterAthlete.captain) {
                                rosterAthlete["captain"] = 0;
                            }
                            
                            rosterAthlete["captain"] = this.props.athlete.rosterAthlete.captain == true || this.props.athlete.rosterAthlete.captain == 1 ? 1 : 0;
                            rosterAthlete["athlete"] = this.props.athlete.rosterAthlete.athlete.url;
                            rosterAthlete["team"] = Utils.getAPIUrl() + "team/" + this.props.match.params.id + "/";

                            // call database and add athlete to team
                            this.props.functions.addRosterAthlete(rosterAthlete, () => {
                                this.props.functions.setRosterAthlete({});
                                this.refreshRoster(); // refresh roster list
                                this.props.functions.setAddAthleteModal(false); // close modal window

                                this.props.functions.setAlertMsg("Roster spot Saved!");
                                this.props.functions.setAlert(true); // open alert modal
                                setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically
                            }, error => {
                                if (error.response && error.response.status == 401) {
                                    this.props.functions.setErrorMsg(error.response.data.detail);
                                    this.props.functions.setError(true); // open error modal
                                } else {
                                    this.props.functions.setErrorMsg("Failed to add athlete to roster. Please check internet connection and refresh page.");
                                    this.props.functions.setError(true); // open error modal
                                    this.props.functions.setAddAthleteModal(false); // close modal window
                                }
                            })

                        }}>

                            <Button onClick={() => this.props.functions.setAthleteModal(true)}>Create New Athlete</Button>
                            {/*CAPTAIN*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>Captain</FormHelperText>
                                    <Checkbox
                                        id="roster-athlete-captain"
                                        checked={this.props.athlete.rosterAthlete.hasOwnProperty("captain") ? this.props.athlete.rosterAthlete.captain == 1 ? true : false : false}
                                        onClick={event => {
                                            this.handleCheckboxChange(event);
                                        }}
                                    />
                                </FormControl>
                            </div>

                            {/*ATHLETE*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>Athlete</FormHelperText>
                                    <Select
                                        onChange={this.handleSelectorChange}
                                        options={this.getAthleteOptions()}
                                        defaultValue={{ label: this.props.athlete.rosterAthlete.hasOwnProperty('athlete') ? this.props.athlete.rosterAthlete.athlete.firstName + " " + this.props.athlete.rosterAthlete.athlete.lastName + " (" + this.props.athlete.rosterAthlete.athlete.gradYear + ")" : "Select an Option...", value: this.props.athlete.rosterAthlete.hasOwnProperty('athlete') ? this.props.athlete.rosterAthlete : null}}
                                    />
                                </FormControl>
                            </div>

                             <br/>

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

                    {/*==================*/}
                    {/*ADD NEW ATHLETE FORM*/}
                    {/*==================*/}
                    <FormModal open={this.props.navigation.athleteModal} label={"Create/Edit Athlete"} close={() => {
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
                                    this.props.functions.setCurrentAthlete({});
                                    this.refreshAthletes(); // refresh athlete list
                                    this.props.functions.setAthleteModal(false); // close modal window
                                    this.props.functions.setAddAthleteModal(false); // close modal window

                                    this.props.functions.setAlertMsg("Athlete created!  Can now be found in dropdown to add to roster!");
                                    this.props.functions.setAlert(true); // open alert modal
                                    setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically
                                    setTimeout(() => this.props.functions.setAddAthleteModal(true), 3000); // Reopen add athlete modal automatically

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

export default connect(mapStateToProps, mapDispatchToProps)(Roster);