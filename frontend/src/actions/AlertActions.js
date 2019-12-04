export const setAlert = alert => {
    return dispatch => {
        dispatch({
            type: 'SET_ALERT',
            alert: alert,
        })
    }
};

export const setAlertMessage = alertMsg => {
    return dispatch => {
        dispatch({
            type: 'SET_ALERT_MSG',
            alertMsg: alertMsg,
        })

    }
};