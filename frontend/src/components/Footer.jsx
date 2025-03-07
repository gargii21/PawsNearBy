import React from "react";

function Footer() {
  return (
    <footer>
      <section className="about-us">
        <h3>About Us</h3>
        <p>PawsNearby connects pet owners with reliable caregivers for their furry friends.</p>
      </section>
      <section className="message">
        <h3>Contact Us</h3>
        <form>
          <textarea placeholder="Write your message here..." required></textarea>
          <br />
          <input type="submit" value="Send" />
        </form>
      </section>
      <div className="footer-bottom">
        <p>&copy; 2025 PawsNearby | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
