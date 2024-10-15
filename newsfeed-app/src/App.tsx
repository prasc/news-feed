import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Newsfeed from './pages/Newsfeed';
import Login from './pages/Login';
import './assets/main.scss';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status when the app loads
    fetch('http://localhost:5001/auth/status', {
      credentials: 'include', // Include credentials (cookies)
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to authenticate');
      })
      .then((data) => {
        setUser(data.user); // Set user data if authenticated
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Proected route for Newsfeed */}
        <Route
          path="/newsfeed"
          element={
            user ? (
              <Newsfeed />
            ) : (
              // Redirect to login if the user is not authenticated
              <Navigate to="/login" />
            )
          }
        />
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Default route, redirect to newsfeed or login based on authentication */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/newsfeed" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
