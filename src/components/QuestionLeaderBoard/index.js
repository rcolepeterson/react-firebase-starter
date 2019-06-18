import React, { Component } from 'react';
import { withFirebase } from '../Firebase';


const QuestionList = ({ questions, deleteFunction, doUpVoteQuestion }) => (
    <ul>
        {questions.map(question => (
            <li key={question.id} >
                <p>
                    <strong>ID:</strong> {question.id}
                </p>
                <p>
                    <strong>questionText:</strong> {question.data.questionText}
                </p>
                <button onClick={() => {
                    deleteFunction(question.id);
                }}>Delete</button>
                <button onClick={() => {
                    doUpVoteQuestion(question.id);
                }}>UpVote</button>
                votes: {question.data.votes && question.data.votes.length || 0}
            </li>
        ))}
    </ul>
);

class QuestionLeaderBoardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            questions: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.questions().then((questions) => {
            console.log('got em', questions);
            //this.setState({ loading: false, questions: questions });
        });
        let doc = this.props.firebase.getdb().collection('questions');
        let observer = doc.onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: ${docSnapshot}`);
            this.setState({ loading: false, questions: docSnapshot.docs });
            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        });



    }
    componentWillUnmount() {
        //this.props.firebase.users().off();
    }


    render() {
        const { questions, loading } = this.state;
        return (
            <div>
                <h1>Leaderboard</h1>
                {loading && <div>Loading ...</div>}

                <QuestionList questions={questions}
                    doUpVoteQuestion={this.props.firebase.doUpVoteQuestion}
                    deleteFunction={this.props.firebase.doDeleteQuestion} />
            </div>
        );
    }
}




export default withFirebase(QuestionLeaderBoardPage);