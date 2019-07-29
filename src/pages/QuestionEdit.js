import {FormControl, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import * as ROUTES from '../constants/routes';
import {AuthUserContext, withAuthorization} from '../Session';
import useMountEffect from '../hooks/useMountEffect';
const INITIAL_STATE = {
  questionText: '',
  error: null
};

const QuestionFormPage = ({history, firebase, match}) => {
  const [state, updateState] = useState(INITIAL_STATE);

  const didMount = () => {
    const doc = firebase.doGetSingleQuestion(match.params.questionId);
    doc.get().then(
      docSnapshot => {
        let question = docSnapshot.data();
        console.log(question.uid, firebase.currentUser().uid);
        if (question.uid !== firebase.currentUser().uid) {
          history.push(ROUTES.QUESTION_LEADERBOAD);
        }
        updateState(prev => ({...prev, questionText: question.questionText}));
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  useMountEffect(didMount);

  const onSubmit = event => {
    event.preventDefault();
    const {questionText} = state;
    const {doEditQuestion} = firebase;
    return doEditQuestion(match.params.questionId, questionText)
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
          <h2>Edit a Question</h2>
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
                Edit Question
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
