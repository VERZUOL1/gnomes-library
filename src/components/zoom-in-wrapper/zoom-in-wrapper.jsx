import React from 'react';
import PropTypes from 'prop-types';
import { easeElasticOut } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { Animate } from 'react-move';

/**
 * Zoom in animation
 * @param show {boolean=} Triggers the animation
 * @param onAnimationEnd {function=} Callback to be executed on animation end
 * @param children {*} React or html element(s) to be animated
 * @param duration {number=} Animation duration
 * @param delay {number=} Animation start delay
 * @param style {object=} Wrapper div styles
 * @returns {*}
 * @constructor
 */
const ZoomInWrapper = ({ show, onAnimationEnd, children, delay, duration, style }) => (
  <Animate
    show={show}
    start={{
      scale: 0
    }}
    enter={{
      scale: [1],
      timing: { duration, delay, ease: easeElasticOut },
      events: {
        end: onAnimationEnd && typeof onAnimationEnd === 'function' ? onAnimationEnd : () => {}
      }
    }}
    update={{
      scale: [1],
      timing: { duration: 750, ease: easeElasticOut }
    }}
    leave={{
      scale: [0],
      timing: { duration: 750, ease: easeElasticOut }
    }}
    interpolation={interpolate}>
    {({ scale }) => (
      <div
        style={{ ...style, transform: `scale(${scale})` }}>
        {children}
      </div>
    )}
  </Animate>
);

ZoomInWrapper.defaultProps = {
  onAnimationEnd: undefined,
  show: true,
  delay: 1000,
  duration: 1000,
  style: {}
};

ZoomInWrapper.propTypes = {
  onAnimationEnd: PropTypes.func,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  delay: PropTypes.number,
  duration: PropTypes.number,
  style: PropTypes.shape({})
};

export default ZoomInWrapper;
