/**
 * ALERT REDUCER
 *
 * Written by: Gordon
 */
const initialState = {
    isAlert: false,
    alertMsg: ""
};

export default function alertReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_ALERT":
            return Object.assign({}, state, {isAlert: action.alert});

        case "SET_ALERT_MSG":
            return Object.assign({}, state, {alertMsg: action.alertMsg});

        default:
            return state; // just return the default state
    }

}