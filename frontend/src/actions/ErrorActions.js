export const setError = error => {
    return dispatch => {
        dispatch({
            type: 'SET_ERROR',
            error: error,
        })
    }
};

export const setErrorMessage = errorMsg => {
    return dispatch => {
        dispatch({
            type: 'SET_ERROR_MSG',
            errorMsg: errorMsg,
        })

    }
};