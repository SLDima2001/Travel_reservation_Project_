import React, { useState } from "react";
import axios from "axios";

const TravelRecommender = () => {
  const [weather, setWeather] = useState("sunny");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState("");
  const [guestType, setGuestType] = useState("solo");
  const [budget, setBudget] = useState("medium");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!weather || !duration || !interests || !guestType || !budget) {
      alert("Please enter all details.");
      return;
    }

    setLoading(true);
    setRecommendations("");

    try {
      const response = await axios.post(`http://localhost:5555/getRecommendations`, {
        weather, duration, interests, guestType, budget
      });

      setRecommendations(response.data.recommendation || "No recommendations found.");
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

      <label style={styles.label}>Preferred Weather:</label>
      <select style={styles.input} value={weather} onChange={(e) => setWeather(e.target.value)}>
        <option value="sunny">Sunny</option>
        <option value="rainy">Rainy</option>
        <option value="cool">Cool</option>
      </select>

      <label style={styles.label}>Duration of Stay (days):</label>
      <input type="number" style={styles.input} value={duration} onChange={(e) => setDuration(e.target.value)} min="1" />

      <label style={styles.label}>Your Interests (comma separated):</label>
      <input type="text" style={styles.input} placeholder="Beaches, wildlife, history..." value={interests} onChange={(e) => setInterests(e.target.value)} />

      <label style={styles.label}>Guest Type:</label>
      <select style={styles.input} value={guestType} onChange={(e) => setGuestType(e.target.value)}>
        <option value="solo">Solo</option>
        <option value="family">Family</option>
        <option value="couple">Couple</option>
      </select>

      <label style={styles.label}>Budget:</label>
      <select style={styles.input} value={budget} onChange={(e) => setBudget(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button style={loading ? styles.buttonDisabled : styles.button} onClick={getRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {recommendations && <div style={styles.result}>{recommendations}</div>}
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
    marginTop: "50px"
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#333"
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  },
  buttonDisabled: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    fontSize: "16px"
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#e3f2fd",
    borderRadius: "5px",
    fontWeight: "bold"
  }
};

export default TravelRecommender;
