/**
 * TEAM REDUCER
 *
 * Written by: Gordon
 */
const initialState = {
    team: {},
    teams: [],
};

export default function teamReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_CURRENT_TEAM":
            return Object.assign({}, state, {team: action.team});
        case "SET_CURRENT_TEAMS":
            return Object.assign({}, state, {teams: action.teams});

        default:
            return state; // just return the default state
    }

}