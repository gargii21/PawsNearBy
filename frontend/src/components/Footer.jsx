import React, { useState } from "react";

function Footer() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch("https://formspree.io/f/xqapvwvv", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setMessageSent(true);
          form.reset(); // clear the form
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        alert("There was an error sending your message.");
      });
  };

  return (
    <footer>
      <div className="footer-up">
        <section className="about-us">
          <h3>About Us</h3>
          <br />
          <p>
            At PawsNearby, we connect loving pet owners with trusted local caregivers for daycare, boarding, and more.
            Our platform makes finding reliable pet care easy, so you can have peace of mind while your furry friends
            are in good hands. Join us in building a community that cares—because pets deserve the best!
          </p>
        </section>

        <section className="message">
          <h3>Contact Us</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <textarea name="message" placeholder="Write your message here..." required></textarea>
            <button type="submit">Send</button>
          </form>
          {messageSent && <p className="sent-message">Message sent successfully! 💌</p>}
        </section>

        <section className="socials">
          <h3>Follow Us</h3>
          <br />
          <div className="social-icons">
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/gargii21/PawsNearBy" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PawsNearby | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
