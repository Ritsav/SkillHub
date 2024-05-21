import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../../firebase/firebase.js";
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      console.log("User ID:", user.uid);
    } else {
      console.log("No user is signed in.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("memberEmail")) {
      const index = parseInt(name.split("-")[1]);
      
      setFormData((prevState) => {
        const updatedTeamMembers = [...prevState.teamMembers];
        if (!updatedTeamMembers[index]) {
          updatedTeamMembers[index] = {};
        }
        updatedTeamMembers[index]["email"] = value;
        return { ...prevState, teamMembers: updatedTeamMembers };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

      const formDataRef = collection(firestore, "pitches");

      const teamMembers = [];
      for(let i = 0; i < formData.noOfMembers; i++){
        teamMembers.push(formData.teamMembers[i].email);
      };

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
        teamMembers: [],

        reason: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const memberElements = [];
  for (let i = 0; i < formData.noOfMembers; i++) {
    memberElements.push(
      <div key={i} style={{ marginBottom: "30px" }}>
        <label className="member-label">
          Member {i + 1}: 
        </label>

        <label htmlFor={`memberEmail-${i}`} className="member-label" style={{ marginBottom: "30px" }}>
          <br />Email: 
        </label>
        <input
          type="text"
          id={`memberEmail-${i}`}
          name={`memberEmail-${i}`}
          className="member-email"
          value={formData.teamMembers[i]?.email || ""}
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
             
              <div style={{ marginBottom: "30px" }}></div>
              
              {memberElements} {/* Calling the members array accorrding to the number of members. */}

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