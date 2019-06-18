import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
//import firebase from "firebase";


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();

    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    // *** db ***

    getdb = () => this.db;

    // *** User API ***

    // user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.collection("users")
    currentUser = () => this.auth.currentUser;

    // *** Question API ***
    questions = () => this.db.collection("questions").get()
        .then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => {
                return { data: doc.data(), id: doc.id };
            });
        })

    doCreateQuestion = (questionText) => {
        return this.db.collection("questions").add({
            questionText,
            uid: this.currentUser().uid
        });
    }

    doDeleteQuestion = (id) => {
        return this.db.collection("questions").doc(id).delete();
    }

    doUpVoteQuestion = (id) => {
        var docRef = this.db.collection("questions").doc(id);
        docRef.update({
            "votes": firebase.firestore.FieldValue.arrayUnion(this.currentUser().uid)
        });
    }

    doDownVoteQuestion = (questionText) => {
        console.log('downvote')
    }
}

export default Firebase;