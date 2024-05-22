import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import "./BasicInfoForm.css";
import { firestore } from '../../firebase/firebase.js';

function BasicInfo({ userDocId, onFormSubmit }) {
  const [formData, setFormData] = useState({
    nameOfApplicant: '',
    phone: '',
    location: '',
    userType: '',
  });

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
      userType: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataRef = doc(firestore, "users", userDocId); // Use the document ID

      const formDataMap = {
        basicInformation: {
          nameOfApplicant: formData.nameOfApplicant,
          phone: formData.phone,
          location: formData.location,
        },
        isBasicInfo: true,
        userType: formData.userType,
      };

      await updateDoc(formDataRef, formDataMap);
      console.log("Form submitted successfully!");

      setFormData({
        nameOfApplicant: "",
        phone: '',
        location: '',
        userType: '',
      });

      onFormSubmit(); // Call the callback function to update parent state
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="Form-Container">
        <form onSubmit={handleSubmit} id="form">
          <h1 id="Header">Basic Information</h1>
          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="nameOfApplicant">
              Name of the Applicant:
            </label>
            <input
              type="text"
              id="nameOfApplicant"
              name="nameOfApplicant"
              value={formData.nameOfApplicant}
              onChange={handleChange}
              placeholder="Name"
              className="textField"
              required
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="phone">
              Phone Number of Applicant:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="textField"
              required
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="location">
              Location of Applicant:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="textField"
              required
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
                <label htmlFor="level" style={{ paddingRight: "30px" }}>
                  User Type:
                </label>

                <select
                  id="level"
                  name="level"
                  value={formData.userType}
                  onChange={handleOptionChange}
                >
                  <option value="">-- Select --</option>
                  <option value="User">User</option>
                  <option value="Investor">Investor</option>
                </select>
              </div>

          <button type="submit" className="btn-next">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default BasicInfo;
