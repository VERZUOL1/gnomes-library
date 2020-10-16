import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './animated-switch.scss';

const AnimatedSwitch = ({ location, children, animation }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames={animation} timeout={300}>
      <Switch location={location}>
        {children}
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

AnimatedSwitch.defaultProps = {
  animation: 'fade'
};

AnimatedSwitch.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string
  }).isRequired,
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    'fade',
    'slide',
    'slide-fade'
  ])
};

export { AnimatedSwitch };
export default withRouter(AnimatedSwitch);
