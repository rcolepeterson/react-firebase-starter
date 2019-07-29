import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
// };

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // default value for sorting the questions on the leader board page.
  orderQuestionsBy = 'time';

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  getAuth = () => this.auth;

  // *** db ***

  getdb = () => this.db;

  // *** User API ***

  // user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.collection('users');
  currentUser = () => {
    return this.auth.currentUser;
  };
  // https://www.robinwieruch.de/react-firebase-authorization-roles-permissions/
  isAdmin = () => {
    const uid = this.currentUser().uid;
    let usersRef = this.getdb().collection('users');
    // Create a query against the collection
    return usersRef
      .where('isAdmin', '==', true)
      .where('uid', '==', uid)
      .get()
      .then(value => {
        return value.docs.length > 0;
      });
  };

  // *** Question API ***
  //   questions = () =>
  //     this.db
  //       .collection('questions')
  //       .get()
  //       .then(querySnapshot => {
  //         return querySnapshot.docs.map(doc => {
  //           return {data: doc.data(), id: doc.id};
  //         });
  //       });

  doCreateQuestion = questionText => {
    return this.db.collection('questions').add({
      questionText,
      uid: this.currentUser().uid,
      submittedBy: this.currentUser().email,
      created: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  doDeleteQuestion = id => {
    return this.db
      .collection('questions')
      .doc(id)
      .delete();
  };
  doGetSingleQuestion = id => {
    return this.db.collection('questions').doc(id);
  };
  doEditQuestion = (questionid, value) => {
    this.orderQuestionsBy = 'time';
    return this.db
      .collection('questions')
      .doc(questionid)
      .update({
        questionText: value,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      });
  };

  doUpVoteQuestion = questionid => {
    const docRef = this.db.collection('questions').doc(questionid);
    docRef.update({
      votes: firebase.firestore.FieldValue.arrayUnion(this.currentUser().uid)
    });
  };

  doDownVoteQuestion = questionId => {
    const docRef = this.db.collection('questions').doc(questionId);
    docRef.update({
      votes: firebase.firestore.FieldValue.arrayRemove(this.currentUser().uid)
    });
  };
}

export default Firebase;
