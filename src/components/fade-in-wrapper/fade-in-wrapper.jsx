import React from 'react';
import PropTypes from 'prop-types';
import { easeQuadOut } from 'd3-ease';
import { interpolate, interpolateTransformSvg } from 'd3-interpolate';
import { Animate } from 'react-move';

/**
 * Fade in-out animation
 * @param show {boolean=} Triggers the animation
 * @param onAnimationEnd {function=} Callback to be executed on animation end
 * @param children {*} React or html element(s) to be animated
 * @param duration {number=} Animation duration
 * @param delay {number=} Animation start delay
 * @param style {object=} Wrapper div styles
 * @param scaleFrom {number=} Initial scale value
 * @returns {*}
 * @constructor
 */
const FadeInWrapper = ({ show, onAnimationEnd, children, delay, duration, style, scaleFrom }) => (
  <Animate
    show={show}
    start={{ opacity: 0, scale: scaleFrom }}
    enter={{
      opacity: [1],
      scale: [1],
      timing: { duration, delay, ease: easeQuadOut },
      events: {
        end: onAnimationEnd && typeof onAnimationEnd === 'function' ? onAnimationEnd : () => {}
      }
    }}
    update={{
      opacity: [1],
      timing: { duration: 1000, ease: easeQuadOut, delay: 2000 }
    }}
    leave={[
      {
        opacity: [0],
        timing: { delay: 300, duration: 500, ease: easeQuadOut }
      }
    ]}
    interpolation={(begValue, endValue, attr) => {
      if (attr === 'transform') {
        return interpolateTransformSvg(begValue, endValue);
      }

      return interpolate(begValue, endValue);
    }}>
    {({ opacity, scale }) => (
      <div
        style={{ opacity, transform: `scale(${scale})`, ...style }}>
        {children}
      </div>
    )}
  </Animate>
);

FadeInWrapper.defaultProps = {
  onAnimationEnd: undefined,
  show: true,
  delay: 300,
  duration: 1000,
  style: {},
  scaleFrom: 1
};

FadeInWrapper.propTypes = {
  onAnimationEnd: PropTypes.func,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  delay: PropTypes.number,
  duration: PropTypes.number,
  style: PropTypes.shape({}),
  scaleFrom: PropTypes.number
};

export default FadeInWrapper;
