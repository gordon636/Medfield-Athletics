import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './css/App.css';

import PrivateRoute from "./components/PrivateRoute";
import TitleBar from './components/TitleBar';

import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Team from "./components/Team";
import Roster from "./components/Roster";
import Athlete from './components/Athlete';

import { loadUser } from './actions/AuthActions';

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import RootReducer from "./reducers/RootReducer";

import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";


// set our default material UI color
const theme = createMuiTheme({
    root: {
        display: 'flex',
    },
    palette: {
        primary: {
            main: '#add8e6'
        },
        secondary: {
            main: '#000000',
        },
        error: {
            main: '#dd2c00'
        },
        // highlight1: {
        //     main: '#e5fbe5'
        // },
        // highlight2: {
        //     main: '#e5fbe5'
        // }

    },
    typography: {
        useNextVariants: true,
    },
});


// Create our redux store
const store = createStore(RootReducer, applyMiddleware(thunk));

/**
 * App.js is the entry point to this application and only handles the routing to the correct component
 */
class App extends Component {
    // constructor(props) {
    //     super(props);

    //     // Add alert that you are navigating out of the app. (no back button functionality)
    //     window.addEventListener('beforeunload', function (e) {
    //         // Cancel the event as stated by the standard.
    //         e.preventDefault();
    //         // Chrome requires returnValue to be set.
    //         e.returnValue = '';
    //     });
    // }

    componentDidMount() {
        store.dispatch(loadUser());
    }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Fragment>
                            <Grid container direction='row' justify="center" alignItems='center' spacing={10} style={{minWidth: 950}}>                                
                                <TitleBar />
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/login" component={Login}/>
                                    <PrivateRoute exact path="/register" component={Register}/>
                                    <Route exact path="/home" component={Home}/>
                                    <Route exact path="/athlete/:id" component={Athlete}/>
                                    <Route exact path="/team" component={Team}/>
                                    <Route exact path="/team/:id" component={Roster}/>
                                    <Route exact path="/404" component={NotFound}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </Grid>
                        </Fragment>
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>

        );
    }
}

export default App;
