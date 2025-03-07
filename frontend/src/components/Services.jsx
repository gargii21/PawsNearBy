import React from "react";

function Services() {
  return (
    <section className="features">
      <h3>Our Services</h3>
      <div className="service-cards">
        {[
          { title: "Pet Sitting", text: "Trusted sitters available for in-home care." },
          { title: "Dog Walking", text: "Daily walks for happy, healthy pets." },
          { title: "Boarding", text: "Overnight stays with verified caregivers." },
        ].map(({ title, text }, index) => (
          <div className="service-card" key={index}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
