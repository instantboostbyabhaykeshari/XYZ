// ConfirmationModal.js
import React from "react";
import "../../Styles/Components/core/ConfirmationModal.css";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <p className="modal-title">{modalData?.text1}</p>
        <p className="modal-text">{modalData?.text2}</p>
        <div className="modal-actions">
          <button 
          onClick={modalData?.btn1Handler}
          className="modal-primary-btn">
             {modalData?.btn1Text}
          </button>
          <button
            className="modal-secondary-btn"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}