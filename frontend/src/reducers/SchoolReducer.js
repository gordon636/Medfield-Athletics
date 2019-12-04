/**
 * School Reducer
 *
 * Written by: Gordon
 */

const initialState = {
    schools: [],
    school: {}
};

export default function navigationReducer(state, action) {
    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case "SET_CURRENT_SCHOOLS":
            return Object.assign({}, state, {schools: action.schools});
        case "SET_CURRENT_SCHOOL":
                return Object.assign({}, state, {school: action.school});
        default:
            return state; // just return the default state
    }

}