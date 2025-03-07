import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-up">
        <section className="about-us">
          <h3>About Us</h3>
          <p>
            At PawsNearBy, we connect loving pet owners with trusted local caregivers for daycare, boarding, and more. 
            Our platform makes finding reliable pet care easy, so you can have peace of mind while your furry friends 
            are in good hands. Join us in building a community that cares—because pets deserve the best!
          </p>
        </section>
        
        <section className="message">
          <h3>Contact Us</h3>
          <form>
            <textarea placeholder="Write your message here..." required></textarea>
            <button type="submit">Send</button>
          </form>
        </section>

        <section className="socials">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
             
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              
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
