import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your API Gateway endpoint.
    const apiUrl = `${process.env.REACT_APP_API}/users`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          action: 'register',
          email: email,
          name: name,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        navigate('/');
        // You can redirect the user to their account dashboard or another page here.
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegistration}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Register</button>
      </form>

      <div>{message}</div>
    </div>
  );
}

export default Registration;
