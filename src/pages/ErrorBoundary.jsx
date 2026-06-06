import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary:", error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center max-w-lg">
            <h1 className="text-6xl font-bold text-red-500">Oops!</h1>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-3 text-gray-500">
              An unexpected error occurred while loading this page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-8
                px-6
                py-3
                rounded-xl
                bg-black
                text-white
                hover:bg-gray-800
                transition
              "
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
