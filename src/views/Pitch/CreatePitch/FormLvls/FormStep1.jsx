import React from "react";
import '../CreatePitch.css';

const FormStep1 = ({ formData, handleChange, handleOptionChange, handleNext }) => {
  return (
    <>
      <h1 id="Header">Basic Info</h1>
      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="nameOfInstitute">
          Name of College/University of the Applicant:
        </label>
        <input
          type="text"
          id="nameOfInstitute"
          name="nameOfInstitute"
          value={formData.nameOfInstitute}
          onChange={handleChange}
          placeholder="Kathford School"
          required
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="level" style={{ paddingRight: "30px" }}>
          Level of Study:
        </label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={handleOptionChange}
        >
          <option value="">-- Select --</option>
          <option value="HighSchool">HighSchool</option>
          <option value="UnderGrad">UnderGrad</option>
          <option value="PostGrad">PostGrad</option>
        </select>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="area">Area of Study:</label>
        <input
          type="text"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />
      </div>

      <div className="btn-container">
        <button type="button" className="btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default FormStep1;
