import React, { useState } from "react";
import "../styles/requestForm.css"; // Link to CSS

const RequestFormModal = ({ isOpen, onClose, caregiverName }) => {
  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pets: [
      { name: "", type: "", age: "", size: "", notes: "" }
    ],
    serviceType: "",
    fromDate: "",
    toDate: "",
    startTime: "",
    endTime: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    const pets = [...formData.pets];
    pets[index][name] = value;
    setFormData({ ...formData, pets });
  };

  const addPet = () => {
    setFormData({
      ...formData,
      pets: [...formData.pets, { name: "", type: "", age: "", size: "", notes: "" }]
    });
  };

  const removePet = (index) => {
    const pets = [...formData.pets];
    pets.splice(index, 1);
    setFormData({ ...formData, pets });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Send Request {caregiverName && `to ${caregiverName}`}</h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h3>Pet Details</h3>
              {formData.pets.map((pet, index) => (
                <div key={index} className="pet-card">
                  <h4>Pet {index + 1}</h4>
                  <div className="form-group">
                    <label>Pet Name:</label>
                    <input type="text" name="name" value={pet.name} onChange={(e) => handlePetChange(index, e)} required />
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <select name="type" value={pet.type} onChange={(e) => handlePetChange(index, e)} required>
                      <option value="">Select</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Age:</label>
                    <input type="text" name="age" value={pet.age} onChange={(e) => handlePetChange(index, e)} required />
                  </div>
                  <div className="form-group">
                    <label>Size:</label>
                    <select name="size" value={pet.size} onChange={(e) => handlePetChange(index, e)} required>
                      <option value="">Select</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes (optional):</label>
                    <textarea name="notes" rows="2" value={pet.notes} onChange={(e) => handlePetChange(index, e)} />
                  </div>
                  {formData.pets.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removePet(index)}>Remove</button>
                  )}
                  <hr />
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addPet}>Add Another Pet</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Service & Schedule</h3>
              <div className="form-group">
                <label>Service Type:</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Boarding">Boarding</option>
                  <option value="Sitting">Sitting</option>
                </select>
              </div>
              <div className="form-group">
                <label>From Date:</label>
                <input type="date" name="fromDate" value={formData.fromDate} min={today} onChange={handleChange} required />
                {errors.fromDate && <p className="error">{errors.fromDate}</p>}
                <label>To Date:</label>
                <input type="date" name="toDate" value={formData.toDate} min={today} onChange={handleChange} required />
                {errors.toDate && <p className="error">{errors.toDate}</p>}
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                <label>End Time:</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Additional Message</h3>
              <div className="form-group">
                <textarea name="message" rows="4" placeholder="Add any specific requirements..." value={formData.message} onChange={handleChange} />
              </div>
            </>
          )}

          <div className="form-navigation">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Previous</button>}
            {step < 3 && <button type="button" onClick={() => {
              if (step === 2 && !validateStep2()) return;
              setStep(step + 1);
            }}>Next</button>}
            {step === 3 && <button type="submit">Submit</button>}
          </div>
        </form>

        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default RequestFormModal;
