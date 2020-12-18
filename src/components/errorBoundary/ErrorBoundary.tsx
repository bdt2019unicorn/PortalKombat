import React, { ErrorInfo } from 'react';
import { Redirect } from 'react-router-dom';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // This is where you can log error & errorInfo to the service of your choice
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to="/error" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
