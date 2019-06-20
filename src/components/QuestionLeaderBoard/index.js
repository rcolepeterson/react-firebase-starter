import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';

const QuestionList = ({
  questions,
  deleteFunction,
  doUpVoteQuestion,
  doDownVoteQuestion,
  currentUserUid
}) => {
  return (
    <ul>
      {questions.map(question => {
        const {questionText, votes, created} = question.data();

        var d = new Date();
        d.setTime(created.seconds * 1000);

        const {id} = question;
        let votedFor = false;
        if (votes) {
          votedFor = votes.filter(voter => voter === currentUserUid).length > 0;
        }
        return (
          <li style={{textAlign: 'left'}} key={id}>
            <h2>
              <strong>{questionText}</strong>
            </h2>
            <p className="text-muted">{d.toLocaleString()}</p>
            {/* <button
              onClick={() => {
                deleteFunction(id);
              }}>
              Delete
            </button> */}

            {/* <Button
              style={{opacity: votedFor ? 1 : 0.2}}
              onClick={() => {
                if (votedFor) {
                  doDownVoteQuestion(id);
                } else {
                  doUpVoteQuestion(id);
                }
              }}>
              Likes
            </Button> */}
            <IconButton
              style={{opacity: votedFor ? 1 : 0.2}}
              onClick={() => {
                if (votedFor) {
                  doDownVoteQuestion(id);
                } else {
                  doUpVoteQuestion(id);
                }
              }}
              edge="start"
              color="inherit">
              <ThumbUpIcon />
            </IconButton>
            {votes ? votes.length : 0}
          </li>
        );
      })}
    </ul>
  );
};

class QuestionLeaderBoardPage extends Component {
  constructor(props) {
    super(props);
    this.sortByTime = this.sortByTime.bind(this);
    this.sortByVotes = this.sortByVotes.bind(this);
    this.state = {
      loading: false,
      questions: []
    };
  }

  sortByTime() {
    let questions = this.state.questions.sort((a, b) => {
      return a.data().created.seconds < b.data().created.seconds ? 1 : -1;
    });
    this.setState({loading: false, questions: questions});
  }

  sortByVotes() {
    let questions = this.state.questions.sort((a, b) => {
      let aVotes = a.data().votes ? a.data().votes.length : 0;
      let bVotes = b.data().votes ? b.data().votes.length : 0;
      return aVotes < bVotes ? 1 : -1;
    });
    this.setState({loading: false, questions: questions});
  }

  componentDidMount() {
    this.setState({loading: true});
    const doc = this.props.firebase.getdb().collection('questions');

    this.unsubscribe = doc.onSnapshot(
      docSnapshot => {
        this.setState({loading: false, questions: docSnapshot.docs});
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    this.props.firebase.getAuth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({currentUserUid: user.uid});
      } else {
        // No user is signed in.
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {questions, loading, currentUserUid} = this.state;
    return (
      <div>
        <h1>Leaderboard</h1>
        {loading && <div>Loading ...</div>}
        <Button onClick={this.sortByTime}>Sorty By Time</Button>
        <Button onClick={this.sortByVotes}>Sorty By Votes</Button>
        <QuestionList
          questions={questions}
          currentUserUid={currentUserUid}
          doUpVoteQuestion={this.props.firebase.doUpVoteQuestion}
          doDownVoteQuestion={this.props.firebase.doDownVoteQuestion}
          deleteFunction={this.props.firebase.doDeleteQuestion}
        />
      </div>
    );
  }
}

export default withFirebase(QuestionLeaderBoardPage);
