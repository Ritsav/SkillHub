import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../../firebase/firebase.js';
import { doc, getDoc } from "firebase/firestore"; 

function PitchDetails() {
    const { id } = useParams();
    const [pitch, setPitch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPitch = async () => {
            try {
                const pitchRef = doc(firestore, "pitches", id);
                const docSnap = await getDoc(pitchRef);
                
                if (docSnap.exists()) {
                    setPitch(docSnap.data().aboutProject);
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
            <h1>{pitch.projectName}</h1>
            <p>{pitch.projectDescription}</p>
        </div>
    );
}

export default PitchDetails;