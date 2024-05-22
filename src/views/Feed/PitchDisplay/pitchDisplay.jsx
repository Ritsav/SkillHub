import React, { useEffect, useState } from 'react';
import './pitchDisplay.css';
import { Link } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase.js';
import { collection, getDocs } from "firebase/firestore"; 

export function PitchBlock({ pitch, title, id }) {
    return (
        <Link to={`/pitch/${id}`} className='pitchBlock'>
            <h2>{title}</h2>
            <p>{pitch}</p>
        </Link>
    );
}

function PitchDisplay() {
    const [pitches, setPitches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPitches = async () => {
            try {
                const pitchesRef = collection(firestore, "pitches");
                const querySnapshot = await getDocs(pitchesRef);
                const pitchesData = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data().aboutProject;
                    pitchesData.push({
                        id: doc.id, // Store the document ID
                        description: data.projectDescription,
                        title: data.projectName
                    });
                });

                setPitches(pitchesData);
            } catch (error) {
                console.error("Error fetching pitches:", error);
                setError("Error fetching pitches");
            } finally {
                setLoading(false);
            }
        };

        fetchPitches();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='pitchDisplay'>
            {pitches.map((pitchData, index) => (
                <PitchBlock key={index} id={pitchData.id} pitch={pitchData.description} title={pitchData.title} />
            ))}
        </div>
    );
}

export default PitchDisplay;
