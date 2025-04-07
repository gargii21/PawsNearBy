import React, { useState } from "react";
import "../styles/caregiver.css";

const BecomeCaregiver = () => {
  const [formData, setFormData] = useState({
    name: "",
    daycareName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    services: [],
    experience: "",
    fees: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Caregiver Info Submitted:", formData);
    alert("Thank you for signing up as a caregiver!");
  };

  return (
    <div className="caregiver-page">
      {/* Hero Section */}
      <header className="caregiver-header">
        <div>
          <h1>Become a Caregiver</h1>
          <p>Join our trusted network and provide loving care to pets near you!</p>
        </div>
        <a href="#caregiver-form" className="caregiver-btn">Get Started</a>
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
          <h2>Sign Up as a Caregiver</h2>

          <p className="notice">
            <strong>Note:</strong> Please <a href="/login">sign in</a> or <a href="/signup">sign up</a> first if you haven't already.
          </p>

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="daycareName">Daycare Name</label>
          <input
            type="text"
            id="daycareName"
            name="daycareName"
            placeholder="Name of your daycare (if any)"
            value={formData.daycareName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <h4>Address Details</h4>

          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="House No., Street Name"
            value={formData.street}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder="Postal Code"
            value={formData.pincode}
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

          <label htmlFor="experience">Years of Experience</label>
          <input
            type="number"
            id="experience"
            name="experience"
            placeholder="Enter number of years"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="fees">Fees (per day/service)</label>
          <input
            type="number"
            id="fees"
            name="fees"
            placeholder="Enter amount in INR"
            value={formData.fees}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="about">About You</label>
          <textarea
            id="about"
            name="about"
            rows="4"
            placeholder="Tell us about yourself and your love for pets..."
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
