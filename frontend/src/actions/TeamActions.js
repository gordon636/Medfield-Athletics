/**
 * TEAM ACTIONS
 *
 * This file contains all the actions which can be dispatched for working with teams
 *
 * Written by: Gordon
 */
import axios from "axios";
import Utils from "../components/Utils";
import { tokenConfig } from "./AuthActions";

export const setCurrentTeam = team => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_TEAM',
            team: team,
        });
    }
};

export const setCurrentTeams = teams => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_TEAMS',
            teams: teams,
        });
    }
};

export const fetchTeam = (id, callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "team/" + id)
        .then(team => {
            dispatch(setCurrentTeam(team.data)) // set our current team if we can
            if (callback)
                callback(team.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        });
};

export const fetchTeams = (callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "team/")
        .then(teams => {
            dispatch(setCurrentTeams(teams.data)) // set our current teams if we can
            if (callback)
                callback(teams.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        });
};

export const saveTeam = (team, callback, errorCallback) => (dispatch, getState) => {
    let method = null;
    let url = Utils.getAPIUrl(); // base url
    if (team.hasOwnProperty("url")) {
        method = "PUT";
        url = url + "team/" + Utils.getIDfromURL(team.url) + "/";
    } else {
        method = "POST";
        url = url + "team/";
    }
    
    if (method == "POST") {
        axios
            .post(url, team, tokenConfig(getState))
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
            .put(url, team, tokenConfig(getState))
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

export const deleteTeam = (team, callback, errorCallback) => (dispatch, getState) => {
    if (team.hasOwnProperty('url')) {
        axios
            .delete(team.url, tokenConfig(getState))
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
            errorCallback("Must include url to delete team");
        }
        return null;
    }
}