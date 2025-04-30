import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminlogin = () => {
    navigate("/adminsignin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5555/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userEmail", email); // Save email
  alert("Login Successful!");
  navigate("/userdashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Invalid login credentials");
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={styles.container}>




      <div style={styles.background}></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input 
            type="email" 
            style={styles.input} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

        <button type="submit" style={styles.button}>Sign In</button>
        <a href="/register" style={styles.link}>If You Haven't an Account</a>
      </form>
      <button 
onClick={adminlogin} 
style={{
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "1rem",
  cursor: "pointer",
}}>Admin Login</button>
    </div>
  );
};

// Styles with background effects and animations
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
    background: "url('https://source.unsplash.com/1600x900/?abstract,technology')",
    backgroundSize: "cover",
    filter: "blur(8px)",
    zIndex: 0,
  },
  link: {
    color: "#ff4d4d",
    fontSize: "16px",
    display: "block",
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  form: {
    position: "relative",
    backgroundColor: "rgba(245, 240, 240, 0.85)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(30, 26, 26, 0.2)",
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
    backgroundColor: "rgba(247, 245, 251, 0.7)",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "rgba(35, 115, 206, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#e04e50",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default SignIn;
