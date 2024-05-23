import React from "react";
import '../CreatePitch.css';

const FormStep2 = ({ formData, handleChange, handlePrev, handleNext }) => {
  return (
    <>
      <h1 id="Header">About Project</h1>
      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="projectName">Name of Project: </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="projectDescription">Project Description: </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="problemStatement">Problem Statement: </label>
        <textarea
          id="problemStatement"
          name="problemStatement"
          value={formData.problemStatement}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="uspAndSolution">USP/Solution: </label>
        <textarea
          id="uspAndSolution"
          name="uspAndSolution"
          value={formData.uspAndSolution}
          onChange={handleChange}
          required
        />
      </div>

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

export default FormStep2;