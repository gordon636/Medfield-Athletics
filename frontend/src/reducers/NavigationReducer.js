/**
 * Navigation Reducer
 *
 * Written by: Gordon
 */

const initialState = {
    loading: false,
    currentTab: 0,
    teamModal: false,
    athleteModal: false,
    addAthleteModal: false,
    currentPage: "/home"
};

export default function navigationReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_CURRENT_TAB":
            return Object.assign({}, state, {currentTab: action.tab});
        case "SET_LOADING":
            return Object.assign({}, state, {loading: action.loading});
        case "SET_TEAM_MODAL":
            return Object.assign({}, state, {teamModal: action.teamModal});
        case "SET_ATHLETE_MODAL":
            return Object.assign({}, state, {athleteModal: action.athleteModal});
        case "SET_ADD_ATHLETE_MODAL":
            return Object.assign({}, state, {addAthleteModal: action.addAthleteModal});
        case "SET_CURRENT_PAGE":
            return Object.assign({}, state, {currentPage: action.page});

        default:
            return state; // just return the default state
    }

}