import React from "react";

const services = [
  { id: 1, name: "Pet Sitting", description: "Reliable sitters to care for your pets at home.", icon: "🐶" },
  { id: 2, name: "Dog Walking", description: "Daily walks to keep your pet active & happy.", icon: "🚶‍♂️" },
  { id: 3, name: "Boarding", description: "Overnight stays in a cozy home environment.", icon: "🏡" },
];

function Services() {
  return (
    <section className="services">
      <h2 className="section-title">Our Services</h2>
      <div className="services-container">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
