import React, { useState } from 'react';

function ContactUs() {
  // State to store form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [mailSent, setMailSent] = useState(false); // Added state variable for mail status

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a request object
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        issue: issue,
      }),
    };

    try {
      // Send the request to your Lambda function via API Gateway
      
      const response = await fetch(`${process.env.REACT_APP_API}/contactus`, request);
      
      if (response.ok) {
        // Request was successful, set mailSent to true
        setMailSent(true);
      } else {
        // Request failed, handle the error here
        console.error('Request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }

    // Reset form fields after submission
    setName('');
    setEmail('');
    setIssue('');
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="issue">Issue:</label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Contact</button>
        </div>
      </form>
      {mailSent && <p>Mail sent to Admin Successfully</p>} {/* Display success message if mailSent is true */}
    </div>
  );
}

export default ContactUs;
