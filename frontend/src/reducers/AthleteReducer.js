/**
 * ATHLETE REDUCER
 *
 * Written by: Gordon
 */
const initialState = {
    athlete: {},
    athletes: [],
    rosterAthlete: {},
    rosterAthletes: []
};

export default function athleteReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_CURRENT_ATHLETE":
            return Object.assign({}, state, {athlete: action.athlete});
        case "SET_CURRENT_ATHLETES":
            return Object.assign({}, state, {athletes: action.athletes});
        case "SET_ROSTER_ATHLETE":
                return Object.assign({}, state, {rosterAthlete: action.rosterAthlete});
        case "SET_ROSTER_ATHLETES":
                return Object.assign({}, state, {rosterAthletes: action.rosterAthletes});

        default:
            return state; // just return the default state
    }

}