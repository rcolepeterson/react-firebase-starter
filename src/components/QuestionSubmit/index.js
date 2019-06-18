import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const INITIAL_STATE = {
    questionText: '',
    error: null,
};

const QuestionFormPage = () => (
    <div>
        <h1>Question Form</h1>
        <QuestionForm />
    </div>
);

class QuestionFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();
        const { questionText } = this.state;
        const { doCreateQuestion } = this.props.firebase;
        return doCreateQuestion(questionText).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
            .catch(function (error) {
                console.log("Error submitting question: ", error);
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            questionText,
            error,
        } = this.state;

        const isInvalid = questionText === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="questionText"
                    value={questionText}
                    onChange={this.onChange}
                    type="text"
                    placeholder="question"
                />
                <button disabled={isInvalid} type="submit">
                    Add Question
        </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default QuestionFormPage;

const QuestionForm =
    compose(
        withRouter,
        withFirebase,
    )(QuestionFormBase);

export { QuestionFormBase };
