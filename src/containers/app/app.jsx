import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Components
import Library from '../library';
import AnimatedSwitch from '../../components/animated-switch';
import Tests from '../../components/tests/tests';

// Helpers

/**
 * Application wrapper
 */
const App = () => (
  <AnimatedSwitch animation='fade'>
    <Route
      path='/'
      component={Library} />
    <Route
      path='/tests'
      component={Tests} />
    <Route path='*'>
      <Redirect to='/' />
    </Route>
  </AnimatedSwitch>
);

export default App;
