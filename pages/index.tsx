import React, { useState } from "react";
import { Hero, Nav } from "../components";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
        const response = await fetch("/api/protect", {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
        });

        if (response.status === 200) {
            setIsAuthenticated(true);
        } else {
            setError('Authentication failed. Please check your credentials.');
        }
    } catch (err) {
        setError("There was an error with the authentication.");
    }
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Please authenticate to view this page.</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <Hero />
    </>
  );
}
