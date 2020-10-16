import React from 'react';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';

import './not-found.scss';

const NotFound = () => {
  const dispatch = useDispatch();
  return (
    <div className='not-found__container'>
      <h4>Page not found</h4>
      <div onClick={() => dispatch(goBack())}>Go back</div>
    </div>
  );
};

export default NotFound;
