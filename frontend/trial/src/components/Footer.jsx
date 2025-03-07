import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-up">
      <section className="about-us">
        <h3>About Us</h3>
        <br/>
        <p>At PawsNearBy, we connect loving pet owners with trusted local caregivers for daycare, boarding, and more. Our platform makes finding reliable pet care easy, so you can have peace of mind while your furry friends are in good hands. Whether you need a sitter for a day or a cozy stay for your pet, we’ve got you covered!<br/>Join us in building a community that cares—because pets deserve the best!</p>
      </section>
      <section className="message">
        <h3>Contact Us</h3>
        <br/>
        <form>
          <textarea placeholder="Write your message here..." required></textarea>
          <br />
          <input type="submit" value="Send" />
        </form>
      </section>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 PawsNearby | All Rights Reserved</p>
      </div>
      </footer>
    
  );
}

export default Footer;
