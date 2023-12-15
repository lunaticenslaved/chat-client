import { Component, ErrorInfo, PropsWithChildren } from 'react';

export type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);

    this.state = {};
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  override render() {
    if (this.state.error && this.state.errorInfo) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>
            {JSON.stringify(this.state.error, null, 2)}
            {JSON.stringify(this.state.errorInfo, null, 2)}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
