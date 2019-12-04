/**
 * ATHLETE ACTIONS
 *
 * This file contains all the actions which can be dispatched for working with athletes
 *
 * Written by: Gordon
 */

import Utils from "../components/Utils";
import { tokenConfig } from "./AuthActions";
import axios from 'axios';


export const setCurrentAthlete = athlete => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_ATHLETE',
            athlete: athlete,
        });
    }
};

export const setCurrentAthletes = athletes => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_ATHLETES',
            athletes: athletes,
        });
    }
};

export const setRosterAthlete = rosterAthlete => {
    return dispatch => {
        dispatch({
            type: 'SET_ROSTER_ATHLETE',
            rosterAthlete: rosterAthlete,
        });
    }
};

export const setRosterAthletes = rosterAthletes => {
    return dispatch => {
        dispatch({
            type: 'SET_ROSTER_ATHLETES',
            rosterAthletes: rosterAthletes,
        });
    }
};


export const fetchAthlete = (id, callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "athlete/" + id)
        .then(athlete => {
            dispatch(setCurrentAthlete(athlete.data)) // set our current athlete if we can
            if (callback)
                callback(athlete.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        });
};

export const fetchAthletes = (callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "athlete/")
        .then(athletes => {
            dispatch(setCurrentAthletes(athletes.data)); // set our current athletes if we can
            if (callback)
                callback(athletes.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        })
};

export const saveAthlete = (athlete, callback, errorCallback) => (dispatch, getState) => {
    let method = null;
    let url = Utils.getAPIUrl(); // base url
    if (athlete.hasOwnProperty("url")) {
        method = "PUT";
        url = url + "athlete/" + Utils.getIDfromURL(athlete.url) + "/";
    } else {
        method = "POST";
        url = url + "athlete/";
    }

    if (method == "POST") {
        axios
            .post(url, athlete, tokenConfig(getState))
            .then(res => {
                if(callback)
                    callback(res)
            })
            .catch(err => {
                console.error(err);
                if(errorCallback)
                    errorCallback(err);
            });
    } else if (method == "PUT") {
        axios
            .put(url, athlete, tokenConfig(getState))
            .then(res => {
                if(callback)
                    callback(res)
            })
            .catch(err => {
                console.error(err);
                if(errorCallback)
                    errorCallback(err);
            });
    }
};

export const deleteAthlete = (athlete, callback, errorCallback) => (dispatch, getState) => {
    if (athlete.hasOwnProperty('url')) {
        axios
            .delete(athlete.url, tokenConfig(getState))
            .then(res => {
                if (callback) {
                    callback(res);
                }
            })
            .catch(err => {
                console.error(err);
                if (errorCallback){
                    errorCallback(err);
                }
            })
    } else {
        if (errorCallback) {
            errorCallback("Must include url to delete athlete");
        }
        return null;
    }
}

export const fetchAthletesByTeam = (id, callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "roster?team_id=" + id)
        .then(athletes => {
            dispatch(setRosterAthletes(athletes.data)); // set our current athletes if we can
            if (callback)
                callback(athletes.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        })
};

export const fetchAthletesBySchool = (id, callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "athlete?school_id=" + id)
        .then(athletes => {
            dispatch(setCurrentAthletes(athletes.data)); // set our current athletes if we can
            if (callback)
                callback(athletes.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        })
};

export const addRosterAthlete = (rosterAthlete, callback, errorCallback) => (dispatch, getState) => {
    let method = null;
    let url = Utils.getAPIUrl(); // base url
    if (rosterAthlete.hasOwnProperty("url")) {
        method = "PUT";
        url = url + "roster/" + Utils.getIDfromURL(rosterAthlete.url) + "/";
    } else {
        method = "POST";
        url = url + "roster/";
    }

    if (method == "POST") {
        axios
            .post(url, rosterAthlete, tokenConfig(getState))
            .then(res => {
                if(callback)
                    callback(res)
            })
            .catch(err => {
                console.error(err);
                if(errorCallback)
                    errorCallback(err);
            });
    } else if (method == "PUT") {
        axios
            .put(url, rosterAthlete, tokenConfig(getState))
            .then(res => {
                if(callback)
                    callback(res)
            })
            .catch(err => {
                console.error(err);
                if(errorCallback)
                    errorCallback(err);
            });
    }
};

export const removeRosterAthlete = (athlete, callback, errorCallback) => (dispatch, getState) => {
    if (athlete.hasOwnProperty('url')) {
        axios
            .delete(athlete.url, tokenConfig(getState))
            .then(res => {
                if (callback) {
                    callback(res);
                }
            })
            .catch(err => {
                console.error(err);
                if (errorCallback){
                    errorCallback(err);
                }
            })
    } else {
        if (errorCallback) {
            errorCallback("Must include url to remove athlete");
        }
        return null;
    }
}