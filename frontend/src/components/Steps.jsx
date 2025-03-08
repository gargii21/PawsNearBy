import React from "react";

function Steps() {
  const steps = [
    { title: "Step 1. Search", text: "Find the best pet sitters near you..", img: "/images/search.png" },
    { title: "Step 2. Choose Caregiver", text: "Choose based on vibe & reviews.", img: "/images/choose.png" },
    { title: "Step 3. Set the Date", text: "Schedule pet care in just a few clicks.", img: "/images/book.png" },
    { title: "Step 4. Relax", text: "Your pet is in loving hands!", img: "/images/relax.png" },
  ];

  return (
    <section className="steps">
      <h2>No Stress, Just Pets</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <img src={step.img} alt={step.title} className="step-image" />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;

