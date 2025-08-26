
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-100 text-red-800">
        <h2 className="font-bold">Something went wrong</h2>
        <pre>{this.state.error?.message}</pre>
      </div>;
    }
    return this.props.children;
  }
}
