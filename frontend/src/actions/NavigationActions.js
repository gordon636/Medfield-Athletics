export const setCurrentTab = tab => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_TAB',
            tab: tab
        })
    }
};

export const setLoading = loading => {
    return dispatch => {
        dispatch({
            type: 'SET_LOADING',
            loading: loading
        })
    }
};

export const setTeamModal = teamModal => {
    return dispatch => {
        dispatch({
            type: 'SET_TEAM_MODAL',
            teamModal: teamModal
        })
    }
};

export const setAthleteModal = athleteModal => {
    return dispatch => {
        dispatch({
            type: 'SET_ATHLETE_MODAL',
            athleteModal: athleteModal
        })
    }
};

export const setAddAthleteModal = addAthleteModal => {
    return dispatch => {
        dispatch({
            type: 'SET_ADD_ATHLETE_MODAL',
            addAthleteModal: addAthleteModal
        })
    }
};

export const setCurrentPage = page => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            page: page
        })
    }
};