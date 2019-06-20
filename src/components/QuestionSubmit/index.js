import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';

import {FormControl, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const INITIAL_STATE = {
  questionText: '',
  error: null
};

const QuestionFormPage = () => <QuestionForm />;

class QuestionFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();
    const {questionText} = this.state;
    const {doCreateQuestion} = this.props.firebase;
    return doCreateQuestion(questionText)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.QUESTION_LEADERBOAD);
      })
      .catch(function(error) {
        console.log('Error submitting question: ', error);
      });
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {questionText, error} = this.state;

    const isInvalid = questionText === '';

    return (
      <div>
        <h1>Ask a Question</h1>
        <FormControl>
          <form onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              multiline
              margin="normal"
              required
              fullWidth
              name="questionText"
              value={questionText}
              onChange={this.onChange}
              type="text"
              placeholder="question"
            />
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Add Question
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </FormControl>
      </div>
    );
  }
}

export default QuestionFormPage;

const QuestionForm = compose(
  withRouter,
  withFirebase
)(QuestionFormBase);

export {QuestionFormBase};
