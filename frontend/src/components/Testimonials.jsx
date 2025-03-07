import React from "react";

function Testimonials() {
  return (
    <section className="testimonials">
      <h3>What Pet Owners Say</h3>
      <div className="testimonial-cards">
        {[
          { text: "\"PawsNearby helped me find the perfect sitter for my dog. Highly recommended!\"", author: "- Emily R." },
          { text: "\"Great experience! My pet was in safe hands.\"", author: "- John D." }
        ].map(({ text, author }, index) => (
          <div className="testimonial-card" key={index}>
            <p>{text}</p>
            <h4>{author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
