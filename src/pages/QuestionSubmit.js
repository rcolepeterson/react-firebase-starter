import {FormControl, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import * as ROUTES from '../constants/routes';
import {AuthUserContext, withAuthorization} from '../Session';
const INITIAL_STATE = {
  questionText: '',
  error: null
};

const QuestionFormPage = ({history, firebase}) => {
  const [state, updateState] = useState(INITIAL_STATE);

  const onSubmit = event => {
    event.preventDefault();
    const {questionText} = state;
    const {doCreateQuestion} = firebase;
    return doCreateQuestion(questionText)
      .then(() => {
        updateState({...INITIAL_STATE});
        history.push(ROUTES.QUESTION_LEADERBOAD);
      })
      .catch(function(error) {
        console.log('Error submitting question: ', error);
      });
  };

  const onChange = event => {
    updateState({[event.target.name]: event.target.value});
  };

  const {questionText, error} = state;

  const isInvalid = questionText === '';

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <>
          <h1>Ask a Question</h1>
          <FormControl>
            <form onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                multiline
                margin="normal"
                required
                fullWidth
                name="questionText"
                value={questionText}
                onChange={onChange}
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
        </>
      )}
    </AuthUserContext.Consumer>
  );
};
const condition = authUser => !!authUser;
export default withAuthorization(condition)(QuestionFormPage);
