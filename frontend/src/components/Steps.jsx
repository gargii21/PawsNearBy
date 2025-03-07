import React from "react";

function Steps() {
  return (
    <section className="steps">
      <h3>How it works</h3>
      <div className="step-cards">
        {[
          { step: "1. Search", text: "Enter your location & explore verified pet sitters in your area." },
          { step: "2. Choose the perfect match", text: "Browse profiles, read reviews, and find a caregiver your pet will adore." },
          { step: "3. Book within a few clicks", text: "Select your dates, confirm the details, and secure your pet’s care instantly." },
          { step: "4. Relax and Enjoy peace of mind", text: "Know that your pet is in loving hands while you work, travel, or take a break." }
        ].map(({ step, text }, index) => (
          <div className="step" key={index}>
            <h3>{step}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;
