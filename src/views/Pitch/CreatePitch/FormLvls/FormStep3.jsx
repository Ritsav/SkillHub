import React from "react";
import '../CreatePitch.css';

const FormStep3 = ({ formData, handleChange, handlePrev, handleNext, memberElements }) => {
  return (
    <>
      <h1 id="Header">Team Members</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="noOfMembers">Number of team members: </label>
        <input
          type="number"
          id="noOfMembers"
          name="noOfMembers"
          value={formData.noOfMembers}
          onChange={handleChange}
          required
        />
      </div>

      <p>
        <i>
          <b>Disclaimer: </b>
          Ensure that the email of your team members corresponds to the email that they have registered with in ProPitch.
        </i>
      </p>

      {memberElements}

      <div className="btn-container">
        <button type="button" className="btn-prev" onClick={handlePrev}>
          Previous
        </button>
        <button type="button" className="btn-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default FormStep3;