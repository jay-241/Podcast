import React, { useState } from 'react';
import Navbar from './Navbar'; 

function Podcast() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTranscriptions = async () => {
    setLoading(true);
    try {
      
      const response = `${process.env.REACT_APP_API}/show`;
      const data = await response.json();
      if (response.ok) {
        setTranscriptions(data.transcripts); // Directly use data.transcripts
      } else {
        console.error('Failed to fetch transcriptions:', data);
      }
    } catch (error) {
      console.error('Error fetching transcriptions:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Transcriptions</h1>
      <button onClick={fetchTranscriptions} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Results'}
      </button>
      <div>
        {transcriptions.length > 0 ? (
          <ul>
            {transcriptions.map((transcript, index) => (
              <li key={index}>
                <h2>Transcript {index + 1}</h2>
                <p>{transcript}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No transcriptions to display.</p>
        )}
      </div>
    </div>
  );
}

export default Podcast;
