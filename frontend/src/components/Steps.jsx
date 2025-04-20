import React from "react";

function Steps() {
  const steps = [
    { title: "Search", text: "Find the best pet sitters near you..", img: "/PawsNearBy/images/search.jpg" },
    { title: "Choose a Caregiver", text: "Choose based on vibe & reviews.", img: "/PawsNearBy/images/choose.png" },
    { title: "Set the Date", text: "Send a detailed request based on your pet’s needs.", img: "/PawsNearBy/images/book.png" },
    { title: "Relax", text: "Your pet is in loving hands!", img: "/PawsNearBy/images/relax.jpg" },
  ];

  return (
    <section className="steps">
      <h2>Your Pet's Perfect Day, Simplified</h2>
      <br/>

      <div className="steps-container">
  {steps.map((step, index) => (
    <div className="step-card" key={index}>
      <div className="step-number">Step {index + 1}</div>
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

