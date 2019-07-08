import React, {useState} from 'react';
import {withFirebase} from '../Firebase';
import Button from '@material-ui/core/Button';
import QuestionList from './QuestionLeaderBoard/QuestionList';
import {Loader} from '../components/Loaders';
import Snackbar from '@material-ui/core/Snackbar';
import useMountEffect from '../hooks/useMountEffect';

const QuestionLeaderBoardPage = ({firebase}) => {
  const [state, setState] = useState({
    loading: false,
    questions: [],
    orderBy: firebase.orderQuestionsBy
  });

  const {open} = state;

  // const updateState = newState => {
  //   setState(previousValue => ({
  //     ...previousValue,
  //     newState
  //   }));
  // };

  const doSortByTime = () => {
    let questions = sortByTime(state.questions);
    firebase.orderQuestionsBy = 'time';
    setState({
      ...state,
      loading: false,
      questions: questions,
      orderBy: firebase.orderQuestionsBy
    });
  };

  const doSortByVotes = () => {
    let questions = sortByVotes(state.questions);
    firebase.orderQuestionsBy = 'votes';
    setState({
      ...state,
      loading: false,
      questions: questions,
      orderBy: firebase.orderQuestionsBy
    });
  };

  const sortByTime = questions =>
    questions.sort((a, b) => {
      return a.data().created.seconds < b.data().created.seconds ? 1 : -1;
    });

  const sortByVotes = questions =>
    questions.sort((a, b) => {
      let aVotes = a.data().votes ? a.data().votes.length : 0;
      let bVotes = b.data().votes ? b.data().votes.length : 0;
      return aVotes < bVotes ? 1 : -1;
    });

  const didMount = () => {
    setState({...state, loading: true});
    const doc = firebase.getdb().collection('questions');
    doc.onSnapshot(
      docSnapshot => {
        let questions =
          firebase.orderQuestionsBy === 'time'
            ? sortByTime(docSnapshot.docs)
            : sortByVotes(docSnapshot.docs);
        setState(previousValue => ({
          ...previousValue,
          loading: false,
          questions: questions
        }));
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    firebase.getAuth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setState(previousValue => ({
          ...previousValue,
          currentUserUid: user.uid
        }));
      } else {
        setState(previousValue => ({
          ...previousValue,
          currentUserUid: null
        }));
      }
    });
  };

  useMountEffect(didMount);

  const handleClick = () => {
    setState({...state, open: true});
  };

  function handleSnackBarClose() {
    setState({...state, open: false});
  }

  return (
    <div>
      <h1>LB{state.orderBy}</h1>
      {state.loading && <Loader />}
      <Button
        variant={state.orderBy === 'time' ? 'outlined' : 'text'}
        onClick={doSortByTime}>
        Sorty By Time
      </Button>
      <Button
        variant={state.orderBy !== 'time' ? 'outlined' : 'text'}
        onClick={doSortByVotes}>
        Sorty By Votes
      </Button>
      <QuestionList
        questions={state.questions}
        currentUserUid={state.currentUserUid}
        doUpVoteQuestion={firebase.doUpVoteQuestion}
        doDownVoteQuestion={firebase.doDownVoteQuestion}
        deleteFunction={firebase.doDeleteQuestion}
        displayNotLoggedInMessage={handleClick}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={<span id="message-id">You must be signed in to vote.</span>}
      />
    </div>
  );
};

export default withFirebase(QuestionLeaderBoardPage);
