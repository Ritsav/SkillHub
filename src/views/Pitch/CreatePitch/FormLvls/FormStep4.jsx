import React from "react";
import '../CreatePitch.css';

const FormStep4 = ({ formData, handleChange, handlePrev, handleSubmit }) => {
  return (
    <>
      <h1 id="Header">Funding Request</h1>
      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="reason">Reason for the funds: </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="amount">Requested Amount: </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="btn-container">
        <button type="button" className="btn-prev" onClick={handlePrev}>
          Previous
        </button>
        <button type="submit" className="btn-next">
          Submit
        </button>
      </div>
    </>
  );
};

export default FormStep4;