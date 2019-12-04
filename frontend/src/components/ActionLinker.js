import * as authActions from "../actions/AuthActions";
import * as errorActions from "../actions/ErrorActions";
import * as alertActions from "../actions/AlertActions";
import * as navigationActions from "../actions/NavigationActions";
import * as athleteActions from "../actions/AthleteActions";
import * as teamActions from "../actions/TeamActions";
import * as schoolActions from "../actions/SchoolActions";


export default class ActionLinker {
    static getAllFunctions(dispatch) {
        // combine all objects full of functions into one giant object and return it
        return Object.assign(
            this.getAuthFunctions(dispatch),
            this.getErrorFunctions(dispatch),
            this.getAlertFunctions(dispatch),
            this.getNavigationFunctions(dispatch),
            this.getAthleteFunctions(dispatch),
            this.getTeamFunctions(dispatch),
            this.getSchoolFunctions(dispatch),
        );
    }


    /**
     * AUTH FUNCTIONS
     * @param dispatch
     * @returns {{loadUser: loadUser, login: login, register: register, logout: logout}}
     */
    static getAuthFunctions(dispatch) {
        return {
            loadUser: () => {
                dispatch(authActions.loadUser())
            },
            login: (username, password) => {
                dispatch(authActions.login(username, password))
            },
            register: (username, password, email) => {
                dispatch(authActions.register(username, password, email))
            },
            logout: () => {
                dispatch(authActions.logout())
            }
        }
    }

    /**
     * ERROR FUNCTIONS
     * @param dispatch
     * @returns {{setErrorMsg: setErrorMsg, setError: setError}}
     */
    static getErrorFunctions(dispatch) {
        return {
            setError: error => {
                dispatch(errorActions.setError(error))
            },
            setErrorMsg: errorMsg => {
                dispatch(errorActions.setErrorMessage(errorMsg))
            },
        }
    }

    /**
     * ALERT FUNCTIONS
     * @param dispatch
     * @returns {{setAlertMsg: setAlertMsg, setAlert: setAlert}}
     */
    static getAlertFunctions(dispatch) {
        return {
            setAlert: alert => {
                dispatch(alertActions.setAlert(alert))
            },
            setAlertMsg: alertMsg => {
                dispatch(alertActions.setAlertMessage(alertMsg))
            },
        }
    }


    /**
     * NAVIGATION FUNCTIONS
     * @param dispatch
     * @returns {{setCurrentTab: setCurrentTab, setLoading: setLoading, setTeamModal: setTeamModal, setCurrentPage: setCurrentPage, setAthleteModal: setAthleteModal, setAddAthleteModal: setAddAthleteModal}}
     */
    static getNavigationFunctions(dispatch) {
        return {
            setCurrentTab: tab => {
                dispatch(navigationActions.setCurrentTab(tab));
            },
            setLoading: loading => {
                dispatch(navigationActions.setLoading(loading));
            },
            setTeamModal: teamModal => {
                dispatch(navigationActions.setTeamModal(teamModal));
            },
            setCurrentPage: page => {
                dispatch(navigationActions.setCurrentPage(page));
            },
            setAthleteModal: athleteModal => {
                dispatch(navigationActions.setAthleteModal(athleteModal));
            },
            setAddAthleteModal: addAthleteModal => {
                dispatch(navigationActions.setAddAthleteModal(addAthleteModal));
            },
        }
    }


    /**
     * ATHLETE FUNCTIONS
     * @param dispatch
     * @returns {{setCurrentAthlete: setCurrentAthlete, setCurrentAthletes: setCurrentAthletes, setRosterAthletes: setRosterAthletes, fetchAthlete: fetchAthlete, fetchAthletes: fetchAthletes, saveAthlete: saveAthlete, fetchAthletesByRoster: fetchAthletesByRoster, removeRosterAthlete: removeRosterAthlete}}
     */
    static getAthleteFunctions(dispatch) {
        return {
            setCurrentAthlete: athlete => {
                dispatch(athleteActions.setCurrentAthlete(athlete));
            },
            setCurrentAthletes: athletes => {
                dispatch(athleteActions.setCurrentAthletes(athletes));
            },
            setRosterAthlete: rosterAthlete => {
                dispatch(athleteActions.setRosterAthlete(rosterAthlete));
            },
            setRosterAthletes: rosterAthletes => {
                dispatch(athleteActions.setRosterAthletes(rosterAthletes));
            },
            fetchAthlete: (id, callback, errorCallback) => {
                dispatch(athleteActions.fetchAthlete(id, callback, errorCallback));
            },
            fetchAthletes: (callback, errorCallback) => {
                dispatch(athleteActions.fetchAthletes(callback, errorCallback));
            },
            saveAthlete: (athlete, callback, errorCallback) => {
                dispatch(athleteActions.saveAthlete(athlete, callback, errorCallback));
            },
            deleteAthlete: (athlete, callback, errorCallback) => {
                dispatch(athleteActions.deleteAthlete(athlete, callback, errorCallback));
            },
            fetchAthletesByTeam: (id, callback, errorCallback) => {
                dispatch(athleteActions.fetchAthletesByTeam(id, callback, errorCallback));
            },
            fetchAthletesBySchool: (id, callback, errorCallback) => {
                dispatch(athleteActions.fetchAthletesBySchool(id, callback, errorCallback));
            },
            addRosterAthlete: (rosterAthlete, callback, errorCallback) => {
                dispatch(athleteActions.addRosterAthlete(rosterAthlete, callback, errorCallback));
            },
            removeRosterAthlete: (athlete, callback, errorCallback) => {
                dispatch(athleteActions.removeRosterAthlete(athlete, callback, errorCallback));
            }
        }
    }

    /**
     * TEAM FUNCTIONS
     * @param dispatch
     * @returns {{setCurrentTeam: setCurrentTeam, setCurrentTeams: setCurrentTeams, fetchTeam: fetchTeam, fetchTeams: fetchTeams, saveTeam: saveTeam, deleteTeam: deleteTeam}}
     */
    static getTeamFunctions(dispatch) {
        return {
            setCurrentTeam: team => {
                dispatch(teamActions.setCurrentTeam(team));
            },
            setCurrentTeams: teams => {
                dispatch(teamActions.setCurrentTeams(teams));
            },
            fetchTeam: (id, callback, errorCallback) => {
                dispatch(teamActions.fetchTeam(id, callback, errorCallback));
            },
            fetchTeams: (callback, errorCallback) => {
                dispatch(teamActions.fetchTeams(callback, errorCallback));
            },
            saveTeam: (team, callback, errorCallback) => {
                dispatch(teamActions.saveTeam(team, callback, errorCallback));
            },
            deleteTeam: (team, callback, errorCallback) => {
                dispatch(teamActions.deleteTeam(team, callback, errorCallback));
            }
        }
    }

    /**
     * SCHOOL FUNCTIONS
     * @param dispatch
     * @returns {{setCurrentSchools: setCurrentSchools, setCurrentSchool: setCurrentSchool, fetchSchools: fetchSchools, fetchSchool: fetchSchool, fetchSchoolByTeam: fetchSchoolByTeam}}
     */
    static getSchoolFunctions(dispatch) {
        return {
            setCurrentSchools: schools => {
                dispatch(schoolActions.setCurrentSchools(schools));
            },
            setCurrentSchool: school => {
                dispatch(schoolActions.setCurrentSchool(school));
            },
            fetchSchools: (callback, errorCallback) => {
                dispatch(schoolActions.fetchSchools(callback, errorCallback));
            },
            fetchSchool: (id, callback, errorCallback) => {
                dispatch(schoolActions.fetchSchool(id, callback, errorCallback));
            }
        }
    }

}