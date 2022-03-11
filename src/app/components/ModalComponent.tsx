import classNames from "classnames";
import React from "react";

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  title?: string;
  showFooter?: boolean;
}

class ModalComponent extends React.Component<Props, {}> {
  render() {
    const modalClass = classNames({
      modal: true,
      modalBackdrop: true,
      fade: true,
      show: this.props.showModal,
    });
    let modalFooter = this.props.showFooter && (
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Understood
        </button>
      </div>
    );
    return (
      <div
        className={modalClass}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        style={{ display: this.props.showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {this.props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onCloseModal}
              ></button>
            </div>
            <div className="modal-body">{this.props.children}</div>
            {modalFooter}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
