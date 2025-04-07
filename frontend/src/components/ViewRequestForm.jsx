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
          <p><strong>Date:</strong> {request.fromDate} to {request.toDate}</p>
          <p><strong>Time:</strong> {request.startTime} - {request.endTime}</p>
          <p><strong>Location:</strong> {request.location}</p>
          <p><strong>Message:</strong> {request.message}</p>
        </div>

        {request.pets && request.pets.length > 0 && (
          <>
            <h3 className="view-pets-title">Pets</h3>
            {request.pets.map((pet, index) => (
              <div key={index} className="view-pet-info">
                <p><strong>Name:</strong> {pet.petName}</p>
                <p><strong>Type:</strong> {pet.petType}</p>
                <p><strong>Age:</strong> {pet.petAge}</p>
                <p><strong>Size:</strong> {pet.petSize}</p>
                {pet.notes && <p><strong>Notes:</strong> {pet.notes}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRequestForm;