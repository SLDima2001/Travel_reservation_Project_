import React, { useState } from "react";
import { Link } from "react-router-dom";

const TravelRecommender = () => {
  const [formData, setFormData] = useState({
    weather: "sunny",
    duration: "",
    interests: "",
    guestType: "solo",
    budget: "medium",
  });
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getRecommendations = async () => {
    if (!formData.duration || !formData.interests) {
      alert("Please enter all details.");
      return;
    }

    setLoading(true);
    setRecommendations("");

    try {
      const response = await fetch("http://localhost:5555/getRecommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendation || "No recommendations found.");
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      setRecommendations("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>Plan Your Trip to Sri Lanka</h2>
      

      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
          {key === "duration" ? (
            <input
              type="number"
              name={key}
              style={styles.input}
              value={value}
              onChange={handleChange}
              min="1"
            />
          ) : key === "interests" ? (
            <input
              type="text"
              name={key}
              style={styles.input}
              placeholder="Beaches, wildlife, history..."
              value={value}
              onChange={handleChange}
            />
          ) : (
            <select name={key} style={styles.input} value={value} onChange={handleChange}>
              {key === "weather" && ["sunny", "rainy", "cool"].map((option) => <option key={option} value={option}>{option}</option>)}
              {key === "guestType" && ["solo", "family", "couple"].map((option) => <option key={option} value={option}>{option}</option>)}
              {key === "budget" && ["low", "medium", "high"].map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          )}
        </div>
      ))}

      <button
        style={loading ? styles.buttonDisabled : styles.button}
        onClick={getRecommendations}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {recommendations && <div style={styles.result}>{recommendations}</div>}
      <div style={{marginTop:'50px'}}>
      <Link to="/" style={{ 
              
              padding: '20px 20px', // Medium size padding
              fontSize: '16px', // Medium font size
              borderRadius: '25px', // Smooth rounded edges
              backgroundColor: 'black', 
              color: 'white', 
              textDecoration: 'none', 
              border: 'none', 
              cursor: 'pointer',
              minWidth: '100px', // Ensures consistent size
              textAlign: 'center' 
          }}>
              <b>Back To Home</b>
          </Link> 
      </div>
    </div>
    
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "50px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#333",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonDisabled: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    fontSize: "16px",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#e3f2fd",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default TravelRecommender;