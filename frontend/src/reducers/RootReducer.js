/**
 * This is the main reducer which combines all other reducers to produce our top level state
 *
 * Written by: Gordon
 */
import {combineReducers} from 'redux'
import navigationReducer from "./NavigationReducer";
import errorReducer from "./ErrorReducer";
import alertReducer from "./AlertReducer";
import optionReducer from "./OptionReducer";
import athleteReducer from "./AthleteReducer";
import teamReducer from "./TeamReducer";
import schoolReducer from "./SchoolReducer";
import authReducer from './AuthReducer';

const RootReducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
    error: errorReducer,
    alert: alertReducer,
    option: optionReducer,
    school: schoolReducer,
    athlete: athleteReducer,
    team: teamReducer,
});

export default RootReducer;