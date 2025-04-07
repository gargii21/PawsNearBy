import React, { useState } from "react";
import "../styles/caregiver.css";

const BecomeCaregiver = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    services: [],
    experience: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      services: checked
        ? [...prevData.services, value]
        : prevData.services.filter((s) => s !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
  
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      console.log(formData.services)
      const response = await fetch("http://localhost:5000/regProvider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          daycare_name: formData.name,
          owner_name: formData.name,
          phone: Number(formData.phone),
          address: formData.location,
          email: formData.email,
          password: "securepassword123", // dummy password
          service: formData.services,
          description: formData.about,
          experience: parseInt(formData.experience),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Thank you for signing up as a caregiver!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting caregiver info:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="caregiver-page">
      
      {/* Hero Section */}
      <header className="caregiver-header">
        <div>
          <h1>Become a Caregiver</h1>
          <p>Join our trusted network and provide loving care to pets near you!</p>
        </div>
        <a href="#caregiver-form" className="btn">Get Started</a>
      </header>

      {/* Why Join Us Cards */}
      <section className="why-join">
        <h2>Why Join PawsNearby?</h2>
        <div className="benefits-container">
          <div className="benefit-card">
            <img src="/images/flexible.png" alt="Flexible Schedule" />
            <h3>Flexible Schedule</h3>
            <p>Choose when and how often you want to provide care.</p>
          </div>
          <div className="benefit-card">
            <img src="/images/income.png" alt="Earn Extra Income" />
            <h3>Earn Extra Income</h3>
            <p>Get paid for doing what you love.</p>
          </div>
          <div className="benefit-card">
            <img src="/images/community.png" alt="Community" />
            <h3>Pet Lover Community</h3>
            <p>Connect with other pet lovers in your area.</p>
          </div>
        </div>
      </section>

      {/* Caregiver Form */}
      <section className="caregiver-form-section" id="caregiver-form">
        <form className="caregiver-form" onSubmit={handleSubmit}>
          <h3>Sign Up as a Caregiver</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="City/Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* Services as Checkboxes */}
          <div className="form-group">
            <label>Services Offered:</label>
            <div className="checkbox-group">
              {["Boarding", "Sitting", "Walking", "Daycare"].map((service) => (
                <label key={service} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleCheckboxChange}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          {/* Years of Experience */}
          <div className="form-group">
            <label>Years of Experience:</label>
            <input
              type="number"
              name="experience"
              placeholder="Enter number of years"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <textarea
            name="about"
            rows="4"
            placeholder="Tell us about yourself..."
            value={formData.about}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default BecomeCaregiver;
