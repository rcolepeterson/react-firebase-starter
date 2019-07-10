import React from 'react';
import {ABOUT, APP_NAME} from '../constants/strings';

const About = () => {
  const createMarkup = () => {
    return {__html: ABOUT};
  };

  return (
    <div>
      <h1>{APP_NAME}</h1>
      <p
        style={{textAlign: 'left', maxWidth: 370, margin: 'auto'}}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
};

export default About;
