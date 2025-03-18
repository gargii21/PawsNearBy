import React, { useState } from "react";
import "../styles/requestForm.css";

const RequestFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    petType: "",
    dateFrom: "",
    dateTo: "",
    size: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    onClose(); // Close after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>

        <h3>Request Form</h3>
        <form onSubmit={handleSubmit}>
          <label>Pet Type:</label>
          <input type="text" name="petType" value={formData.petType} onChange={handleChange} required />

          <label>From Date:</label>
          <input type="date" name="dateFrom" value={formData.dateFrom} onChange={handleChange} required />

          <label>To Date:</label>
          <input type="date" name="dateTo" value={formData.dateTo} onChange={handleChange} required />

          <label>Pet Size:</label>
          <select name="size" value={formData.size} onChange={handleChange} required>
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <label>Requirements:</label>
          <textarea name="requirements" value={formData.requirements} onChange={handleChange} />

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestFormModal;
