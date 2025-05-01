import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt from "jwt-decode";

const AdminSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded Admin Users
  const admins = [
    { username: "admin1", password: "password123", email: "admin1@example.com", isAdmin: true },
    { username: "admin2", password: "securePass456", email: "admin2@example.com", isAdmin: true },
  ];

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.jwtDecode(token);
        
        // Check if token is still valid
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime && decoded.isAdmin) {
          navigate("/admindashboard"); // Redirect to dashboard if already logged in
        } else {
          // Token expired or not admin
          localStorage.removeItem("token");
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const generateToken = (user) => {
    // In a real app, this would be done on the server
    // This is just a client-side simulation for demo purposes
    
    const now = Date.now() / 1000;
    const expirationTime = now + 3600; // 1 hour from now
    
    // Create a token-like structure
    const tokenPayload = {
      sub: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      iat: now,
      exp: expirationTime
    };
    
    // In a real app, you would sign this with a secret key on the server
    // Here we're just encoding it as base64 for simulation
    const tokenString = JSON.stringify(tokenPayload);
    const base64Token = btoa(tokenString);
    
    return `fake-jwt.${base64Token}.signature`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Find the admin user
    const adminUser = admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (adminUser) {
      // Generate JWT token
      const token = generateToken(adminUser);
      
      // Store token in localStorage
      localStorage.setItem("token", token);
      
      // Navigate to dashboard
      navigate("/admindashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Admin Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Sign In
        </button>
       
      </form>
    </div>
  );
};

// Stylish UI with Animations
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg,rgb(136, 199, 225),rgb(172, 166, 166))",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "url('https://source.unsplash.com/1600x900/?technology,abstract')",
    backgroundSize: "cover",
    filter: "blur(8px)",
    zIndex: 0,
  },
  form: {
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", // Slightly darker shadow
    width: "350px",
    textAlign: "center",
    zIndex: 1,
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "5px",
    transition: "0.3s",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff5e62",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#e04e50",
    transform: "scale(1.05)",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  link: {
    color: "#ff4d4d",
    fontSize: "16px",
    display: "block",
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#e04e50",
  },
};

// Adding hover effects using JavaScript
const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
  e.target.style.transform = styles.buttonHover.transform;
};

const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = styles.button.backgroundColor;
  e.target.style.transform = "scale(1)";
};

export default AdminSignIn;