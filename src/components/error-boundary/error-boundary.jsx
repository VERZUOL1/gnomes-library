import React from 'react';
import PropTypes from 'prop-types';

import './error-boundary.scss';

/**
 * Error wrapper
 */
class ErrorBoundary extends React.PureComponent {
  /**
   * Update state with error details
   * @param error
   * @returns {{hasError: boolean, error: *}}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  state = { hasError: false };

  /**
   * Log error
   * @param error
   * @param info
   */
  componentDidCatch(error, info) {
    // Todo - log the error to error reporting service
    // eslint-disable-next-line
    console.log(error, info, this.state.error);
  }

  /**
   * Render fallback UI
   * @returns {*}
   */
  render() {
    const { hasError } = this.state;
    const { hidden, message, children } = this.props;

    if (hasError && hidden) {
      return null;
    }

    if (hasError) {
      return (
        <div className='error-boundary-message'>{message}</div>
      );
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  hidden: false,
  message: 'Error rendering component'
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Do not render error UI, just log an error to console
   */
  hidden: PropTypes.bool,
  /**
   * Error message
   */
  message: PropTypes.string
};

export { ErrorBoundary };
export default React.memo(ErrorBoundary);
