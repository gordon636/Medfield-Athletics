/**
 * OPTIONS REDUCER
 *
 * Holds all selector options that I don't want to have to store in the database
 *
 * Written by: Gordon
 */
const initialState = {
    sport: [
        {value: "Cross Country", label: "Cross Country"},
        {value: "Indoor Track and Field", label: "Indoor Track and Field"},
        {value: "Outdoor Track and Field", label: "Outdoor Track and Field"}
    ],
    sportList : [
        "Cross Country", "Indoor Track and Field", "Outdoor Track and Field"
    ],
    sex: [
        {value: "Female", label: "Female"},
        {value: "Male", label: "Male"}
    ],
    sexList: [
      "Female", "Male"
    ],
    season: [
        {value: "Fall", label: "Fall"},
        {value: "Winter", label: "Winter"},
        {value: "Spring", label: "Spring"},
        {value: "Summer", label: "Summer"}
    ],
    seasonList: [
        "Fall", "Winter", "Spring", "Summer"
    ],
    level: [
        {value: "Freshman", label: "Freshman"},
        {value: "Junior Varsity 2", label: "Junior Varsity 2"},
        {value: "Junior Varsity", label: "Junior Varsity"},
        {value: "Varsity", label: "Varsity"}
    ],
    levelList: [
        "Freshman", "Junior Varsity 2", "Junior Varsity", "Varsity"
    ]
};

export default function optionReducer(state, action) {
    return initialState;
}