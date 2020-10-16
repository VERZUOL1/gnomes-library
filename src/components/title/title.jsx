import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

const Title = ({ title }) => (
  <div className='gl-title-wrapper'>
    <h1>
      {title}
    </h1>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
