import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {Link} from 'react-router-dom';
import React from 'react';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    float: 'right'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const QuestionList = ({
  questions = [],
  doUpVoteQuestion,
  doDownVoteQuestion,
  currentUserUid,
  displayNotLoggedInMessage,
  deleteFunction,
  isAdmin
}) => {
  const classes = useStyles();
  return (
    <ul>
      {questions.map(question => {
        const {
          questionText,
          votes,
          created,
          uid,
          submittedBy = ''
        } = question.data();

        var d = new Date();
        d.setTime(created.seconds * 1000);

        const {id} = question;

        let votedFor = false;
        if (votes) {
          votedFor = votes.filter(voter => voter === currentUserUid).length > 0;
        }
        let isOwner =
          currentUserUid === uid && submittedBy !== 'anonymous@zaaz.com';
        return (
          <li style={{textAlign: 'left'}} key={id}>
            <h2>
              <strong>{questionText}</strong>
            </h2>
            <p className="text-muted">Submitted by {submittedBy}</p>
            <p className="text-muted timeStamp">{d.toLocaleString()}</p>
            <IconButton
              style={{opacity: votedFor ? 1 : 0.2}}
              onClick={() => {
                if (!currentUserUid) {
                  displayNotLoggedInMessage({
                    vertical: 'bottom',
                    horizontal: 'center'
                  });
                  return;
                }
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
            {isAdmin && (
              <Button
                variant="contained"
                onClick={() => {
                  if (!currentUserUid) {
                    displayNotLoggedInMessage({
                      vertical: 'bottom',
                      horizontal: 'center'
                    });
                    return;
                  }

                  deleteFunction(id);
                }}
                color="secondary"
                size="small"
                className={classes.button}>
                Delete
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            )}
            {isOwner && (
              <Button
                style={{float: 'right', marginTop: 6}}
                component={Link}
                to={`/question-edit/${id}`}>
                Edit
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
