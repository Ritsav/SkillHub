import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../../firebase/firebase.js';
import { doc, getDoc } from "firebase/firestore"; 
import './pitchDetails.css'

function PitchDetails() {
    const { id } = useParams();
    const [aboutProject, setAbout] = useState(null);
    const [funding, setfunds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPitch = async () => {
            try {
                const pitchRef = doc(firestore, "pitches", id);
                const docSnap = await getDoc(pitchRef);
                
                if (docSnap.exists()) {
                    setAbout(docSnap.data().aboutProject);
                    setfunds(docSnap.data().funding);
                } else {
                    console.error("No such document!");
                    setError("Pitch not found");
                }
            } catch (error) {
                console.error("Error fetching pitch:", error);
                setError("Error fetching pitch");
            } finally {
                setLoading(false);
            }
        };

        fetchPitch();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='pitchDetails'>
            <h1>Project Title: {aboutProject.projectName}</h1>

            <div className='blockSpacing'>
            <h2>Statement: </h2>
            <p>{aboutProject.problemStatement}</p>
            </div>

            <div style={{ marginBottom: "30px", marginTop: "30px" }}>
            <h2>Description: </h2>
            <p>{aboutProject.projectDescription}</p>
            </div>

            <div className='blockSpacing'>
            <h2>USP & Solution: </h2>
            <p>{aboutProject.uspAndSolution}</p>
            </div>

            <div className='blockSpacing'>
                <h2>Team: </h2>
                <p>Lead: </p>
                <p>Other Members: </p>
                <p></p> {/* Over here, need to link to the user profile of the team member*/}
            </div>
            
            <div className='blockSpacing'>
            <h2>Funding Reasons: </h2>
            <p>{funding.reason}</p>
            </div>

            <div className='blockSpacing'>
            <h2>Requested Funding Amount: </h2>
            <p>Rs. {funding.amount}</p>
            </div>

            
        </div>
    );
}

export default PitchDetails;