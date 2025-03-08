import React from "react";


function Services() {
  const services = [
    { title: "Pet Sitting", text: "Loving care at home.", img: "/images/pet-sitting.png" },
    { title: "Dog Walking", text: "Fun outdoor walks for your pup.", img: "/images/dog-walking.png" },
    { title: "Pet Boarding", text: "Overnight stays with trusted sitters.", img: "/images/pet-boarding.png" },
  ];

  return (
    <section className="services">
      <h2>All in One Place!</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
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
