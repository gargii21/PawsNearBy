import React from "react";


const steps = [
  { id: 1, title: "Create an Account", description: "Sign up in just a few minutes.", icon: "📝" },
  { id: 2, title: "Find a Caregiver", description: "Browse trusted pet sitters nearby.", icon: "🔍" },
  { id: 3, title: "Book & Relax", description: "Schedule and enjoy peace of mind!", icon: "🐾" },
];

function Steps() {
  return (
    <section className="steps">
      <h2 className="section-title">How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={step.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;

