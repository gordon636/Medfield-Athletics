import axios from 'axios';
import Utils from "../components/Utils";

const baseUrl = Utils.getAPIUrl();


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: 'USER_LOADING' });
  // If no token saved, just continue as a guest
  if (tokenConfig(getState).headers.hasOwnProperty("Authorization")) {
    axios
    .get(baseUrl + "api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: "USER_LOADED",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "SET_ERROR",
        error: true
      });
      dispatch({
        type: "SET_ERROR_MSG",
        errorMsg: "Unable to load user, please log in again."
      });
      dispatch({
        type: 'AUTH_ERROR'
      });
    });
  }
};
  
  // LOGIN USER
  export const login = (username, password) => dispatch => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // Request Body
    const body = JSON.stringify({ username, password });
  
    axios
      .post(baseUrl + "api/auth/login", body, config)
      .then(res => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: "SET_ERROR",
          error: true
        });
        dispatch({
          type: "SET_ERROR_MSG",
          errorMsg: "Incorrect Credentials"
        });
        dispatch({
          type: 'LOGIN_FAIL'
        });
      });
  };
  
  // REGISTER USER
  export const register = ({ username, email, password }) => (dispatch, getState) => {
  
    // Request Body
    const body = JSON.stringify({ username, email, password });
  
    axios
      .post(baseUrl + "api/auth/register", body, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data
        });
        dispatch({
          type: "SET_ALERT",
          alert: true
        });
        dispatch({
          type: "SET_ALERT_MSG",
          alertMsg: "Registration succesful! You may now log in as " + username
        });
        dispatch({
          type: "SET_CURRENT_PAGE",
          currentPage: "home/"
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: "SET_ERROR",
          error: true
        });

        let errMsg = err.response.hasOwnProperty('data') ? err.response.data.hasOwnProperty('username') ? err.response.data.username : err.response.data.hasOwnProperty('email') ? err.response.data.email : "Registration failed!" : "Registration failed!";
        errMsg = errMsg[0]; // Get string from array
        dispatch({
          type: "SET_ERROR_MSG",
          errorMsg: errMsg
        });
        dispatch({
          type: 'REGISTER_FAIL'
        });
      });
  };
  
  // LOGOUT USER
  export const logout = () => (dispatch, getState) => {
    axios
      .post(baseUrl + "api/auth/logout/", null, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: 'LOGOUT_SUCCESS'
        });
      })
      .catch(err => {
          console.log(err);
      });
  };
  
  // Setup config with token - helper function
  export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
  
    return config;
  };