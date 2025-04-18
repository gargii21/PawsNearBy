import React from "react";


function Services() {
  const services = [
    { title: "Pet Sitting", text: "Loving care at home.", img: "/images/pet-sitting.jpg" },
    { title: "Dog Walking", text: "Fun outdoor walks for your pup.", img: "/images/dog-walking.jpg" },
    { title: "Pet Boarding", text: "Overnight stays with trusted sitters.", img: "/images/pet-boarding.jpg" },
  ];

  return (
    <section className="services">
      <h2>From Walks to Weekends- We've Got You</h2>
      <br />
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-badge">★</div>
            <img src={service.img} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
