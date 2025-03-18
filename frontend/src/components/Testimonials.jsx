
import React from "react";


const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    statement: "PawsNearby made finding a pet sitter effortless. My dog loved his stay!",
    image: "/images/testimonial1.jpg", 
  },
  {
    id: 2,
    name: "Michael Brown",
    statement: "Great experience! The caregiver was super friendly and professional.",
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Sophia Davis",
    statement: "Highly recommended! I felt completely at ease leaving my cat in their care.",
    image: "/images/testimonial3.jpg",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="section-title">Spoiler Alert: They Love It Here!</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <p className="testimonial-text">"{testimonial.statement}"</p>
            <h4 className="testimonial-name">- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
