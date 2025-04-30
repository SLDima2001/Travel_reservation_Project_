import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5555/api/auth/register", {
        email,
        password,
      });

      if (response.data.success) {
        alert("Registration Successful! Redirecting to login...");
        navigate("/signin");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error registering user");
      console.error("Registration Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>
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

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password:</label>
          <input 
            type="password" 
            style={styles.input} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" style={styles.button}>Register</button><br />
        <a href="/signin" style={styles.link}>If You Already Have an Account</a>
      </form>
    </div>
  );
};

// Enhanced styles with effects
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
    background: "url('https://source.unsplash.com/1600x900/?landscape,nature')",
    backgroundSize: "cover",
    filter: "blur(10px)",
    zIndex: 0,
  },
  form: {
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
    width: "350px",
    textAlign: "center",
    zIndex: 1,
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    marginTop: "5px",
    transition: "0.4s",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputFocus: {
    borderColor: "#764ba2",
    boxShadow: "0px 0px 10px rgba(118, 75, 162, 0.5)",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "rgba(35, 115, 206, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  buttonHover: {
    backgroundColor: "#5b3c8c",
    transform: "scale(1.05)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  link: {
    color: "#ff4d4d",
    fontSize: "16px",
    display: "block",
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
