import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';

const QuestionList = ({
  questions = [],
  doUpVoteQuestion,
  doDownVoteQuestion,
  currentUserUid,
  displayNotLoggedInMessage
}) => {
  return (
    <ul>
      {questions.map(question => {
        const {
          questionText,
          votes,
          created,
          submittedBy = ''
        } = question.data();

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
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
