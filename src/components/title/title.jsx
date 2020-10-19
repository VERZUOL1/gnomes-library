import React from 'react';
import PropTypes from 'prop-types';

import FadeInWrapper from '../fade-in-wrapper';

import './title.scss';

const Title = ({ title }) => (
  <div className='gl-title-wrapper'>
    <FadeInWrapper>
      <h1>
        {title}
      </h1>
    </FadeInWrapper>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
