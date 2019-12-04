/**
 * ERROR REDUCER
 *
 * Written by: Gordon
 */
const initialState = {
    isError: false,
    errorMsg: ""
};

export default function errorReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_ERROR":
            return Object.assign({}, state, {isError: action.error});

        case "SET_ERROR_MSG":
            return Object.assign({}, state, {errorMsg: action.errorMsg});

        default:
            return state; // just return the default state
    }

}