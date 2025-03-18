import React, { useState } from "react";
import RequestFormModal from "./RequestFormModal";

const ProfileModal = ({ profile, onClose }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{profile.daycare_name}</h2>
        <p><strong>Service:</strong> {profile.service}</p>
        <p><strong>Location:</strong> {profile.city}</p>
        <p><strong>Fees:</strong> ₹{profile.fees}</p>
        <p><strong>Rating:</strong> {profile.rating}⭐</p>

        <button onClick={() => setOpenModal(true)}>Request</button>
        <button onClick={onClose}>Close</button>

        {openModal && (
          <RequestFormModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            caregiverName={profile.daycare_name}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
