/**
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-realtime-database
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Firebase, {FirebaseContext} from './Firebase';
import './index.css';
import App from './App';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,

  document.getElementById('root')
);
