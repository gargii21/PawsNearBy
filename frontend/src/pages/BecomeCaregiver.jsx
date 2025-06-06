import React, { useState } from "react";
import "../styles/caregiver.css";

const BecomeCaregiver = () => {
  const [formData, setFormData] = useState({
    name: "",
    daycareName: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    experience: "",
    fees: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, service: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const response = await fetch("http://localhost:5000/regProvider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          daycare_name: formData.daycareName,
          owner_name: formData.name,
          phone: Number(formData.phone),
          address: formData.location,
          email: formData.email,
          password: "securepassword123",
          service: formData.service,
          description: formData.about,
          experience: parseInt(formData.experience),
          fees: parseInt(formData.fees),
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
      <header className="caregiver-header">
        <a href="#caregiver-form" className="caregiver-btn">Get Started</a>
      </header>

      <section className="why-join">
        <h2>Why Join PawsNearby?</h2>
        <div className="benefits-container">
          <div className="benefit-card">
            <img src="/PawsNearBy/images/flexible.png" alt="Flexible Schedule" />
            <h3>Flexible Schedule</h3>
            <p>Choose when and how often you want to provide care.</p>
          </div>
          <div className="benefit-card">
            <img src="/PawsNearBy/images/income.png" alt="Earn Extra Income" />
            <h3>Earn Extra Income</h3>
            <p>Get paid for doing what you love.</p>
          </div>
          <div className="benefit-card">
            <img src="/PawsNearBy/images/community.png" alt="Community" />
            <h3>Pet Lover Community</h3>
            <p>Connect with other pet lovers in your area.</p>
          </div>
        </div>
      </section>

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

          <label htmlFor="location">Address</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Full address (Street, City, State, Pincode)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label>Service Offered:</label>
            <div className="radio-group">
  {["Boarding", "Sitting", "Walking"].map((service) => (
    <label key={service} className={`radio-label ${formData.service === service ? "selected" : ""}`}>
      <input
        type="radio"
        name="service"
        value={service}
        checked={formData.service === service}
        onChange={handleRadioChange}
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
