import React from 'react';
import { Route } from 'react-router-dom';

// Components
import App from '../app';
import ErrorBoundary from '../../components/error-boundary';

// Styles
import '../../assets/styles/base.scss';

/**
 * Application root component
 */
export default function Root() {
  return (
    <ErrorBoundary>
      <Route path='/' component={App} />
    </ErrorBoundary>
  );
}
