import { useState } from "react";
import "../styles/terms.css";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isChecked) {
      alert("Form submitted successfully!");
    } else {
      alert("Please agree to the Terms & Conditions before submitting.");
    }
  };

  return (
    <div className="terms-container">
      <h2>Pet Owner Terms & Conditions</h2>

      <div className="terms-section">
        <p><b>1. Pet Care Responsibility</b><br />
          The pet owner confirms that they have chosen the daycare provider independently.
          PawsNearby is not responsible for any incidents, injuries, or disputes between the pet owner and the daycare provider.
        </p>

        <p><b>2. Pet Health & Behavior</b><br />
          The pet must be healthy, vaccinated, and free from parasites before daycare.
          The owner agrees to disclose any behavioral issues (aggression, anxiety, etc.).
          The daycare provider may refuse service if the pet is unwell or aggressive.
        </p>

        <p><b>3. Liability & Indemnity</b><br />
          The owner accepts full responsibility for any damages caused by their pet.
          The daycare provider is not liable for minor injuries from normal pet interactions.
          In case of an emergency, the daycare provider may seek veterinary care at the owner's expense.
        </p>

        <p><b>4. Fees & Cancellations</b><br />
          The owner agrees to pay the daycare provider directly as per their rates.
          Cancellations must be made at least 8 hours in advance to avoid charges.
        </p>
      </div>

      <label className="terms-checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        I agree to the Terms & Conditions
      </label>

      <button type="submit" onClick={handleSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default TermsAndConditions;
