import React from "react";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <div className="loading-overlay">
        <div className="loader">
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingOverlay;
