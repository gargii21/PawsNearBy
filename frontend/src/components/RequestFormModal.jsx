import React, { useState } from "react";
import "../styles/requestForm.css";
import axios from "axios";
import { useEffect } from "react";


const RequestFormModal = ({ isOpen, onClose, caregiverName, caregiverId, providerId}) => {
  const today = new Date().toISOString().split("T")[0];
  const [pets,setPets]=useState([])
  const [requestData, setRequestData] = useState(null);

  useEffect (()=>{
    const fetchdata= async()=>{
      const res = await axios.get("http://localhost:5000/getPet",{
        withCredentials: true
      }
    )
      console.log(res.data.pets)
      setPets(res.data.pets)
    }
    fetchdata()
  },[])

  useEffect(() => {
    const sendRequest = async () => {
      if (!requestData) return;

      try {
        const response = await axios.post(
          "http://localhost:5000/createRequest",
          requestData,
          { withCredentials: true }
        );

        if (response.status === 201) {
          console.log("Request submitted successfully");
          alert("Request submitted successfully");
          onClose();
        } else {
          console.error("Failed to submit request");
          alert("Failed to submit request");
        }
      } catch (error) {
        console.error("Error submitting request:", error);
      }
    };

    sendRequest();
  }, [requestData]);


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
      providerId, 
      petId: formData.selectedPetId,
      service: formData.serviceType,
      startDate: formData.fromDate,
      endDate: formData.toDate,
      startTime: formData.startTime,
      endTime: formData.endTime,

      
    };

    setRequestData(requestPayload);
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
        {pets.map((pet) => (
          <option key={pet.Pet_id} value={pet.Pet_id}>
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
                  I agree to the <a href="/termsandconditions" target="_blank">Terms & Conditions</a>
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
