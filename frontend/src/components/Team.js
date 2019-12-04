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
// import Select from "@material-ui/core/Select/Select";
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
import {FormModal} from "./driven/FormModal";
import Select from "react-select";
import {Link} from "react-router-dom";

import ViewIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";





class Team extends Component {

    componentDidMount() {  // this event is triggered on initial page load
        this.props.functions.setCurrentPage("/team");
        this.props.functions.setCurrentTeam({}); // Clear Modal
        this.props.functions.setLoading(true);
        this.props.functions.fetchTeams(() => {
            this.props.functions.fetchSchools(() => {
                this.props.functions.setLoading(false);
            }, () => {
                this.props.functions.setLoading(false);
                this.props.functions.setErrorMsg("Failed to get schools. Please check internet connection and refresh page.");
                this.props.functions.setError(true);
            });
        }, () => {
            this.props.functions.setLoading(false);
            this.props.functions.setErrorMsg("Failed to get teams. Please check internet connection and refresh page.");
            this.props.functions.setError(true);
        });

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

    getSportOptions() {
        let sports = [];
        for (let sportIndex = 0; sportIndex < this.props.option.sport.length; sportIndex++) {
            sports.push({value: this.props.option.sport[sportIndex].value, label: this.props.option.sport[sportIndex].label, input: "sport", props: this.props});
        }
        return sports;
    }

    getSexOptions() {
        let sexes = [];
        for (let sexIndex = 0; sexIndex < this.props.option.sex.length; sexIndex++) {
            sexes.push({value: this.props.option.sex[sexIndex].value, label: this.props.option.sex[sexIndex].label, input: "sex", props: this.props});
        }
        return sexes;
    }

    getLevelOptions() {
        let levels = [];
        for (let levelIndex = 0; levelIndex < this.props.option.level.length; levelIndex++) {
            levels.push({value: this.props.option.level[levelIndex].value, label: this.props.option.level[levelIndex].label, input: "level", props: this.props});
        }
        return levels;
    }

    refreshTeams() {
        this.props.functions.setLoading(true);
        this.props.functions.fetchTeams(() => {
            this.props.functions.setLoading(false);
        }, () => {
            this.props.functions.setLoading(false);
            this.props.functions.setErrorMsg("Failed to get teams. Please check internet connection and refresh page.");
            this.props.functions.setError(true);
        });
    }

    deleteTeam(team) {
        this.props.functions.deleteTeam(team, () => {
            this.refreshTeams();
            this.props.functions.setAlertMsg("Team Deleted!");
            this.props.functions.setAlert(true); // open alert modal
            setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically
        }, error => {
            if (error.response && error.response.status == 401) {
                this.props.functions.setErrorMsg(error.response.data.detail);
                this.props.functions.setError(true); // open error modal
                this.props.functions.setTeamModal(false); // close modal window
            } else {
                this.props.functions.setErrorMsg("Failed to delete team. Please check internet connection and refresh page.");
                this.props.functions.setError(true); // open error modal
                this.props.functions.setTeamModal(false); // close modal window
            }
        })
    }

    handleSelectorChange(event) {
        let teamItem = Object.assign({}, event.props.team.team); // deep copy
        switch (event.input) {
            case 'school':
                teamItem.school = event;
                break;
            case 'sport':
                teamItem.sport = event;
                break;
            case 'sex':
                teamItem.sex = event;
                break;
            case 'level':
                teamItem.level = event;
                break;
            default:
                console.error(event);
                break;
        }
        event.props.functions.setCurrentTeam(teamItem);
    }

    handleValueChange(event) {
        let teamItem = Object.assign({}, this.props.team.team); // deep copy
        switch (event.target.id) {
            case 'team-year':
                teamItem.year = event.target.value;
                break;

            default:
                console.error(event);
                break; // do nothing
        }
        this.props.functions.setCurrentTeam(teamItem);
    }

    render() {
        if (this.props.navigation.loading) {
            return (<Grid item container xs={12} justify={"center"}><CircularProgress style={{margin: 16}} variant={"indeterminate"}/></Grid>) // show nothing if we are loading
        } else {
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

                        {/*New TEAM BUTTON*/}
                        {this.props.auth.isAuthenticated ? 
                            <Tooltip title={"Create new team"} placement={"bottom"}>
                                <Fab style={{marginTop: 8}}
                                    type={"button"}
                                    // variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        // console.log("open modal");
                                        this.props.functions.setTeamModal(true);
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
                                    <TableCell>School</TableCell>
                                    <TableCell>Sport</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.team.teams.map((team, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{team.school.town + " " + team.school.mascot}</TableCell>
                                        <TableCell>{team.sport + " (" + team.sex + ")"}</TableCell>
                                        <TableCell>{team.year}</TableCell>
                                        <TableCell>{team.level}</TableCell>
                                        <TableCell>
                                            <Tooltip title={"View"} placement={"bottom"}>
                                            <Link to={`/team/` + Utils.getIDfromURL(team.url)} style={{marginLeft: 32}} onClick={() => this.props.functions.setCurrentSchool(team.school)}>
                                                <ViewIcon color={"primary"} style={{fontSize: 30}}/>
                                            </Link>
                                            </Tooltip>
                                            {this.props.auth.isAuthenticated ? 
                                                <Fragment>
                                                    <Tooltip title={"Edit"} placement={"bottom"}>
                                                        <EditIcon color={"primary"} style={{fontSize: 30}}
                                                            type={"button"}
                                                            onClick={() => {
                                                                this.props.functions.setCurrentTeam(team);
                                                                this.props.functions.setTeamModal(true);
                                                        }}/>
                                                    </Tooltip>
                                                    <Tooltip title={"Delete"} placement={"bottom"}>
                                                        <DeleteIcon color={"primary"} style={{fontSize: 30}}
                                                        onClick={() => {
                                                            if (window.confirm("Are you absolutely sure you want to delete this team?")) {
                                                                this.deleteTeam(team);
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
                    {/*ADD NEW TEAM FORM*/}
                    {/*==================*/}
                    <FormModal open={this.props.navigation.teamModal} label={"Create/Edit Team"} close={() => {
                        this.props.functions.setTeamModal(false);
                    }}>
                        <form noValidate autoComplete="off" onSubmit={event => {
                            event.preventDefault(); // stop page reload
                            // console.log(event);
                            // console.log(this.props.inventory.currentSeed);

                            // deep copy our seed object
                            let team = Object.assign({}, this.props.team.team);
                            // fix url fields

                            // validate
                            if (!team.hasOwnProperty("year")) {
                                this.props.functions.setErrorMsg("Must enter a year.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.year === null || team.year === '') {
                                this.props.functions.setErrorMsg("Must enter a year.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.year > 2100 || team.year < 1800) {
                                this.props.functions.setErrorMsg("Invalid year.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!team.hasOwnProperty("sport")) {
                                this.props.functions.setErrorMsg("Must choose a sport.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.sport === null) {
                                this.props.functions.setErrorMsg("Must choose a sport.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!this.props.option.sportList.includes(team.sport.hasOwnProperty('value') ? team.sport.value : team.sport)) {
                                this.props.functions.setErrorMsg("No no, don't try to edit the code :)");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!team.hasOwnProperty("sex")) {
                                this.props.functions.setErrorMsg("Must choose a gender.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.sex === null) {
                                this.props.functions.setErrorMsg("Must choose a gender.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!this.props.option.sexList.includes(team.sex.hasOwnProperty('value') ? team.sex.value : team.sex)) {
                                this.props.functions.setErrorMsg("No no, don't try to edit the code :)");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!team.hasOwnProperty("level")) {
                                this.props.functions.setErrorMsg("Must choose a Level.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.level === null) {
                                this.props.functions.setErrorMsg("Must choose a level.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (!this.props.option.levelList.includes(team.level.hasOwnProperty('value') ? team.level.value : team.level)) {
                                this.props.functions.setErrorMsg("No no, don't try to edit the code :)");
                                this.props.functions.setError(true);
                                return;
                            }


                            if (!team.hasOwnProperty("school")) {
                                this.props.functions.setErrorMsg("Must choose a school.");
                                this.props.functions.setError(true);
                                return;
                            }

                            if (team.school === null || team.school === '') {
                                this.props.functions.setErrorMsg("Must choose a school.");
                                this.props.functions.setError(true);
                                return;
                            }

                            team["sport"] = this.props.team.team.sport.hasOwnProperty('value') ? this.props.team.team.sport.value : this.props.team.team.sport;
                            team["year"] = this.props.team.team.year;
                            team["sex"] = this.props.team.team.sex.hasOwnProperty('value') ? this.props.team.team.sex.value : this.props.team.team.sex;
                            team["level"] = this.props.team.team.level.hasOwnProperty('value') ? this.props.team.team.level.value : this.props.team.team.level;
                            team["school"] = this.props.team.team.school.hasOwnProperty('value') ? this.props.team.team.school.value : this.props.team.team.school;

                            this.props.functions.fetchSchool(Utils.getIDfromURL(team["school"].url), school => {
                                team["school"] = school.url;

                                // call database and save team
                                this.props.functions.saveTeam(team, () => {
                                    this.props.functions.setCurrentTeam({});
                                    this.refreshTeams(); // refresh team list
                                    this.props.functions.setTeamModal(false); // close modal window

                                    this.props.functions.setAlertMsg("Team Saved!");
                                    this.props.functions.setAlert(true); // open alert modal
                                    setTimeout(() => this.props.functions.setAlert(false), 3000); // Close automatically
                                }, error => {
                                    if (error.response && error.response.status == 401) {
                                        this.props.functions.setErrorMsg(error.response.data.detail);
                                        this.props.functions.setError(true); // open error modal
                                    } else {
                                        this.props.functions.setErrorMsg("Failed to get team data. Please check internet connection and refresh page.");
                                        this.props.functions.setError(true); // open error modal
                                        this.props.functions.setTeamModal(false); // close modal window
                                    }
                                })
                            }, error => {
                                // if school is NOT found
                                this.props.functions.setErrorMsg("Failed to find school. Please check internet connection and refresh page.");
                                this.props.functions.setError(true); // open error modal
                            });

                        }}>
                            {/*SCHOOL*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>School</FormHelperText>
                                    <Select
                                        onChange={this.handleSelectorChange}
                                        options={this.getSchoolOptions()}
                                        defaultValue={{ label: this.props.team.team.hasOwnProperty('school') ? this.props.team.team.school.hasOwnProperty('town') ? this.props.team.team.school.town : "Select an Option..." : "Select an Option...", value: this.props.team.team.hasOwnProperty('school') ? this.props.team.team.school : null}}
                                    />
                                </FormControl>
                            </div>

                            {/*SPORT*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>Sport</FormHelperText>
                                    <Select
                                        onChange={this.handleSelectorChange}
                                        options={this.getSportOptions()}
                                        defaultValue={{ label: this.props.team.team.hasOwnProperty('sport') ? this.props.team.team.sport : "Select an Option...", value: this.props.team.team.hasOwnProperty('sport') ? this.props.team.team.sport : null}}
                                    />
                                </FormControl>
                            </div>

                            {/*SEX*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>Gender</FormHelperText>
                                    <Select
                                        onChange={this.handleSelectorChange}
                                        options={this.getSexOptions()}
                                        defaultValue={{ label: this.props.team.team.hasOwnProperty('sex') ? this.props.team.team.sex : "Select an Option...", value: this.props.team.team.hasOwnProperty('sex') ? this.props.team.team.sex : null}}
                                    />
                                </FormControl>
                            </div>

                            {/*LEVEL*/}
                            <div>
                                <FormControl fullWidth={true}>
                                    <FormHelperText>Level</FormHelperText>
                                    <Select
                                        onChange={this.handleSelectorChange}
                                        options={this.getLevelOptions()}
                                        defaultValue={{ label: this.props.team.team.hasOwnProperty('level') ? this.props.team.team.level : "Select an Option...", value: this.props.team.team.hasOwnProperty('level') ? this.props.team.team.level : null}}
                                    />
                                </FormControl>
                            </div>

                            {/*YEAR*/}
                            <Tooltip title={"Use year season ends in (i.e. 2000-2001 should be 2001)"} placement={"right"}>
                                <TextField
                                    id='team-year'
                                    label={"Year"}
                                    type={"number"}
                                    fullWidth
                                    value={this.props.team.team.hasOwnProperty('year') && this.props.team.team.year !== null ? this.props.team.team.year : ""}
                                    onChange={event => {
                                        this.handleValueChange(event);
                                    }}
                                />
                            </Tooltip>

                            {/*SAVE BUTTON*/}
                            <Tooltip title={"Save Team"} placement={"right"}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Team);