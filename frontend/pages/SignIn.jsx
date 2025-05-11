import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token validity
      verifyToken(token);
    }
  }, []);

  // Verify token validity
  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:5555/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        navigate("/userdashboard");
      }
    } catch (error) {
      // Token is invalid or expired, clear it
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    }
  };

  const adminLogin = () => {
    navigate("/adminsignin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5555/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Store the JWT token and user info
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", response.data.userId || "");
        
        // Set the default authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        
        // Alert user and redirect
        alert("Login Successful!");
        navigate("/userdashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Invalid login credentials");
      } else {
        setError("Server error or connection problem");
      }
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          style={loading ? {...styles.button, opacity: 0.7} : styles.button}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        
        <div style={styles.links}>
          
          <a href="/register" style={styles.link}>Don't have an account? Register</a>
        </div>
      </form>
      
      <button 
        onClick={adminLogin} 
        style={styles.adminButton}
        disabled={loading}
      >
        Admin Login
      </button>
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
    background: "linear-gradient(135deg, rgb(136, 199, 225), rgb(172, 166, 166))",
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
  links: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#4a6fa5",
    fontSize: "14px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  passwordReset: {
    color: "#666",
    fontSize: "14px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
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
    padding: "12px",
    backgroundColor: "rgba(35, 115, 206, 0.8)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.1s ease",
    fontWeight: "500",
  },
  adminButton: {
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
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    transition: "background 0.3s ease, transform 0.1s ease",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "15px",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    padding: "8px",
    borderRadius: "4px",
    textAlign: "center",
  },
};

export default SignIn;