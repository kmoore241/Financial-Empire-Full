import React, { Component, ReactNode } from 'react';
import { logError } from './logger';

type Props = { 
  children: ReactNode; 
  fallback?: ReactNode; 
};

type State = { 
  hasError: boolean; 
};

/**
 * React Error Boundary to catch rendering errors.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error details
    logError('Uncaught error in component tree', { error, info });
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Allow custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={this.handleRetry}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
