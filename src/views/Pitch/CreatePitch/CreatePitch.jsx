import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "../../../firebase/firebase.js";
import "./CreatePitch.css";
import AuthNavbar from '../../../components/Navbar/AuthNavbar.jsx';
import FormStep1 from "./FormLvls/FormStep1.jsx";
// Import other form steps as needed
import { onAuthStateChanged } from "firebase/auth";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User ID:", user.uid);
      } else {
        console.log("No user is signed in.");
        setUserId(null);
      }
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe();
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
    // Add similar validations for other steps if needed

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
      }

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

  if (loading) {
    return <p>Loading...</p>; // Display a loading message or spinner while auth state is being determined
  }

  return (
    <>
      <AuthNavbar />
      <div className="Form-Container">
        <form onSubmit={handleSubmit} id="form">
          {currentStep === 1 && (
            <FormStep1 
              formData={formData}
              handleChange={handleChange}
              handleOptionChange={handleOptionChange}
              handleNext={handleNext}
            />
          )}

          {/* Render other form steps based on currentStep */}
          
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