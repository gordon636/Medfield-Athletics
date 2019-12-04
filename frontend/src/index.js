import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * Attach our react App.js application to the <root> element on our index page.
 */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
