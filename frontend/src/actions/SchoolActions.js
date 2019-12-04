/**
 * SCHOOL ACTIONS
 *
 * This file contains all the actions which can be dispatched for working with teams
 *
 * Written by: Gordon
 */

import Utils from "../components/Utils";
import { tokenConfig } from "./AuthActions";
import axios from 'axios';

export const setCurrentSchool = school => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_SCHOOL',
            school: school,
        });
    }
};

export const setCurrentSchools = schools => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_SCHOOLS',
            schools: schools,
        });
    }
};

export const fetchSchools = (callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "school/", tokenConfig(getState))
        .then(schools => {
            dispatch(setCurrentSchools(schools.data)); // set our current schools if we can
            if (callback)
                callback(schools.data);
        })
        .catch(err => {
            if (errorCallback)
                errorCallback(err);
        })
};

export const fetchSchool = (id, callback, errorCallback) => (dispatch, getState) => {
    let baseUrl = Utils.getAPIUrl();
    axios
        .get(baseUrl + "school/" + id, tokenConfig(getState))
        .then(school => {
            if (callback)
                callback(school.data);
        })
        .catch(err => {
            console.error(err);
            if (errorCallback)
                errorCallback(err);
        });
};

