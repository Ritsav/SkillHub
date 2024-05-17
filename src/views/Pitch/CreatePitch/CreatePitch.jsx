import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";
import "./CreatePitch.css";
import AuthNavbar from '../../../components/Navbar/AuthNavbar.jsx'

function CreatePitch() {
  const [formData, setFormData] = useState({
    nameOfInstitute: "",
    level: "",
    area: "",
    projectName: "",
    projectDescription: "",
    problemStatement: "",
    uspAndSolution: "",
    noOfMembers: "",
    teamMembers: [],
    reason: "",
    amount: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      level: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && formData.nameOfInstitute.trim() === "") {
      alert("Please enter the name of the college/university.");
      return;
    }
    if (currentStep === 1 && formData.level.trim() === "") {
      alert("Please select the level of study.");
      return;
    }
    if (currentStep === 1 && formData.area.trim() === "") {
      alert("Please select the area of study.");
      return;
    }
    if (currentStep === 2 && formData.projectName.trim() === "") {
      alert("Please input the Project Name.");
      return;
    }
    if (currentStep === 2 && formData.projectDescription.trim() === "") {
      alert("Please input proper project description.");
      return;
    }
    if (currentStep === 2 && formData.problemStatement.trim() === "") {
      alert("Please input proper problem statement.");
      return;
    }
    if (currentStep === 2 && formData.uspAndSolution.trim() === "") {
      alert("Please input proper usp & solution.");
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the currently authenticated user's UID
      const user = auth.currentUser;
      const userId = user.uid;

      const formDataRef = collection(firestore, "pitches");

      const teamMembers = [];

      for (let i = 0; i < formData.noOfMembers; i++) {
        if (
          formData[`Name${i + 1}`] &&
          formData[`Email${i + 1}`] &&
          formData[`Address${i + 1}`] &&
          formData[`Phone${i + 1}`]
        ) {
          teamMembers.push({
            name: formData[`Name${i + 1}`],
            email: formData[`Email${i + 1}`],
            address: formData[`Address${i + 1}`],
            phone: formData[`Phone${i + 1}`],
          });
        }
      }

      // Object containing all the form data
      const formDataMap = {
        basicInfo: {
          nameOfInstitute: formData.nameOfInstitute,
          level: formData.level,
          area: formData.area,
        },
        aboutProject: {
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          problemStatement: formData.problemStatement,
          uspAndSolution: formData.uspAndSolution,
        },
        noOfMembers: formData.noOfMembers,
        teamMembers: teamMembers,
        funding: {
          amount: formData.amount,
          reason: formData.reason,
        },
        userId: userId,
      };

      await addDoc(formDataRef, formDataMap);
      console.log("Form submitted successfully!");

      // Reset form after submission
      setFormData({
        nameOfInstitute: "",
        level: "",
        area: "",
        projectName: "",
        projectDescription: "",
        problemStatement: "",
        uspAndSolution: "",
        
        noOfMembers: "",
        ...Object.fromEntries(
          Object.keys(formData)
            .filter((key) => key.startsWith("Name"))
            .map((key) => [key, ""])
        ),
        ...Object.fromEntries(
          Object.keys(formData)
            .filter((key) => key.startsWith("Email"))
            .map((key) => [key, ""])
        ),
        ...Object.fromEntries(
          Object.keys(formData)
            .filter((key) => key.startsWith("Address"))
            .map((key) => [key, ""])
        ),
        ...Object.fromEntries(
          Object.keys(formData)
            .filter((key) => key.startsWith("Phone"))
            .map((key) => [key, ""])
        ),

        reason: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //Array of JSX elements for team members

  const memberElements = [];
  for (let i = 0; i < formData.noOfMembers; i++) {
    memberElements.push(
      <div key={i} style={{ marginBottom: "30px" }}>
        <label htmlFor={`memberName${i + 1}`} className="member-label">
          Member {i + 1}: <br></br>Name:{" "}
        </label>
        <input
          type="text"
          id={`memberName${i + 1}`}
          name={`memberName${i + 1}`}
          className="member-name"
          value={formData[`Name${i + 1}`]}
          onChange={handleChange}
          required
        />

        <label
          htmlFor={`memberName${i + 1}`}
          className="member-label"
          style={{ marginBottom: "30px" }}
        >
          <br></br>Email:{" "}
        </label>
        <input
          type="text"
          id={`memberEmail${i + 1}`}
          name={`memberEmail${i + 1}`}
          className="member-email"
          value={formData[`Email${i + 1}`]}
          onChange={handleChange}
          required
        />

        <label
          htmlFor={`memberName${i + 1}`}
          className="member-label"
          style={{ marginBottom: "30px" }}
        >
          <br></br>Address:{" "}
        </label>
        <input
          type="text"
          id={`memberAddress${i + 1}`}
          name={`memberAddress${i + 1}`}
          className="member-address"
          value={formData[`Address${i + 1}`]}
          onChange={handleChange}
          required
        />

        <label
          htmlFor={`memberName${i + 1}`}
          className="member-number"
          style={{ marginBottom: "30px" }}
        >
          <br></br>Number:{" "}
        </label>
        <input
          type="number"
          id={`memberPhone${i + 1}`}
          name={`memberPhone${i + 1}`}
          className="member-phone"
          value={formData[`Phone${i + 1}`]}
          onChange={handleChange}
          required
        />
      </div> 
    );
  }

  return (
    <>
      <AuthNavbar/>
      <div className="Form-Container">
        <form onSubmit={handleSubmit} id="form">
          {currentStep === 1 && (
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
          )}

          {currentStep === 2 && (
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
                <label htmlFor="projectDescription">
                  Project Description:{" "}
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label htmlFor="problemStatement">Problem Statement: </label>
                <textarea
                  type="text"
                  id="problem"
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label htmlFor="uspAndSolution">
                  Unique Selling Point(USP)/Solution:{" "}
                </label>
                <textarea
                  type="text"
                  id="usp&Soln"
                  name="uspAndSolution"
                  value={formData.uspAndSolution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
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

              <div className="btn-container">
                <button type="button" className="btn-prev" onClick={handlePrev}>
                  Previous
                </button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  Next
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h1 id="Header">Team Members</h1>

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
          )}

          {currentStep === 4 && (
            <>
              <h1 id="Header">Funding Request</h1>
              <div style={{ marginBottom: "30px" }}>
                <label htmlFor="reason">Reason for the funds: </label>
                <textarea
                  type="text"
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label htmlFor="amount">Reequested Amount:</label>
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
          )}

          <div className="display" style={{ marginTop: "50px" }}>
            <span className={currentStep === 1 ? "dot active" : "dot"}></span>
            <span className={currentStep === 2 ? "dot active" : "dot"}></span>
            <span className={currentStep === 3 ? "dot active" : "dot"}></span>
            <span className={currentStep === 4 ? "dot active" : "dot"}></span>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePitch;