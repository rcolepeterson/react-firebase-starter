/**
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-realtime-database
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Firebase, {FirebaseContext} from './components/Firebase';
import './index.css';
import App from './components/App';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,

  document.getElementById('root')
);
