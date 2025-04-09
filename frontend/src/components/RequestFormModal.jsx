import React, { useState } from "react";
import "../styles/requestForm.css";

const RequestFormModal = ({ isOpen, onClose, caregiverName, caregiverId }) => {
  const today = new Date().toISOString().split("T")[0];

  const userPets = [
    { id: 1, name: "Bella" },
    { id: 2, name: "Max" },
    { id: 3, name: "Luna" },
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedPetId: "",
    serviceType: "",
    fromDate: "",
    toDate: "",
    startTime: "",
    endTime: "",
    message: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.fromDate < today) {
      newErrors.fromDate = "Cannot choose past dates.";
    }
    if (formData.toDate < formData.fromDate) {
      newErrors.toDate = "'To' date must be after 'From' date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestPayload = {
      caregiverId,
      petId: formData.selectedPetId,
      service: formData.serviceType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      message: formData.message,
    };

    try {
      const response = await fetch("/api/requests/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        console.log("Request submitted successfully");
        onClose();
      } else {
        console.error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-request-form">
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Send Request {caregiverName && `to ${caregiverName}`}</h2>

        <form onSubmit={handleSubmit}>
        {step === 1 && (
  <>
    <h3>Select Your Pet</h3>
    <div className="form-group">
      <label>Select Pet:</label>
      <select
        name="selectedPetId"
        value={formData.selectedPetId}
        onChange={handleChange}
        required
      >
        <option value="">Select a pet</option>
        {userPets.map((pet) => (
          <option key={pet.id} value={pet.id}>
            {pet.name}
          </option>
        ))}
      </select>
    </div>
    <p className="info-note">
      Don’t see your pet here?{" "}
      <button
        type="button"
        className="dashboard-link-btn"
        onClick={() => {
          onClose();
          window.location.href = "/dashboard"; // Update path if needed
        }}
      >
        Add one from your dashboard
      </button>
    </p>
  </>
)}


          {step === 2 && (
            <>
              <h3>Service & Schedule</h3>
              <div className="form-group">
                <label>Service Type:</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Sitting">Sitting</option>
                  <option value="Dog Walking">Dog Walking</option>
                  <option value="Boarding">Pet Boarding</option>
                </select>
              </div>
              <div className="form-group">
                <label>From Date:</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  min={today}
                  onChange={handleChange}
                  required
                />
                {errors.fromDate && <p className="error">{errors.fromDate}</p>}

                <label>To Date:</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  min={today}
                  onChange={handleChange}
                  required
                />
                {errors.toDate && <p className="error">{errors.toDate}</p>}
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />

                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Additional Message & Terms</h3>
              <div className="form-group">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Add any specific requirements..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <label>
                  I agree to the <a href="/terms">Terms & Conditions</a>
                </label>
              </div>
            </>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)}>
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={() => {
                  if (step === 2 && !validateStep2()) return;
                  setStep(step + 1);
                }}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button type="submit" disabled={!formData.agreeTerms}>
                Submit
              </button>
            )}
          </div>
        </form>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
    </div>
  );
};

export default RequestFormModal;
