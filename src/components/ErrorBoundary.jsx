import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-error-fallback" role="alert">
          <h1 className="app-error-fallback__title">Something went wrong</h1>
          <p className="app-error-fallback__text">
            The page could not be rendered. Reloading usually fixes it.
          </p>
          <button type="button" className="app-error-fallback__button" onClick={this.handleReload}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
