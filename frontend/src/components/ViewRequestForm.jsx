
import React from "react";

const ViewRequestForm = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="view-modal-overlay">
      <div className="view-modal-content">
        <button className="view-close-btn" onClick={onClose}>×</button>
        <h2 className="view-modal-title">Request Details</h2>

        <div className="view-request-info">
          {request.from && <p><strong>From:</strong> {request.from}</p>}
          {request.to && <p><strong>To:</strong> {request.to}</p>}
          <p><strong>Service:</strong> {request.service}</p>
          <p><strong>Date:</strong> {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {request.startTime} - {request.endTime}</p>
          <p><strong>Message:</strong> {request.description}</p>
        </div>

        {request.Pet && (
          <>
            <h3 className="view-pets-title">Pet Details</h3>
            <div className="view-pet-info">
              <p><strong>Name:</strong> {request.Pet.name}</p>
              <p><strong>Type:</strong> {request.Pet.type}</p>
              <p><strong>Age:</strong> {request.Pet.age}</p>
              <p><strong>Size:</strong> {request.Pet.size}</p>
              {request.Pet.notes && <p><strong>Notes:</strong> {request.Pet.notes}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRequestForm;
