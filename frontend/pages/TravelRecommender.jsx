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
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
    setError("");
    setShowResults(false);
    setCopySuccess(false);

    try {
      // Use the mock endpoint while testing
      const endpoint = "http://localhost:5555/getRecommendations";
      // Switch back to this when API key is configured:
      // const endpoint = "http://localhost:5555/getRecommendations";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Server error: ${response.status} ${errorData.error || ""}`);
      }

      const data = await response.json();
      setRecommendations(data.recommendation || "No recommendations found.");
      setShowResults(true);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('resultsSection')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError(`Failed to get recommendations: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(recommendations)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Plan Your Trip to Sri Lanka</h2>
        <div style={styles.headerImage}></div>
      </div>

      <div style={styles.formContainer}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={styles.formGroup}>
            <label style={styles.label}>
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
            </label>
            {key === "duration" ? (
              <input
                type="number"
                name={key}
                style={styles.input}
                value={value}
                onChange={handleChange}
                min="1"
                placeholder="Number of days"
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
              <select
                name={key}
                style={styles.select}
                value={value}
                onChange={handleChange}
              >
                {key === "weather" &&
                  ["sunny", "rainy", "cool"].map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                {key === "guestType" &&
                  ["solo", "family", "couple"].map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                {key === "budget" &&
                  ["low", "medium", "high"].map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
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
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {showResults && recommendations && (
        <div id="resultsSection" style={styles.resultSection}>
          <div style={styles.resultHeader}>
            <h3 style={styles.resultTitle}>Your Sri Lanka Itinerary</h3>
            <button 
              onClick={copyToClipboard} 
              style={copySuccess ? styles.copyButtonSuccess : styles.copyButton}
              aria-label="Copy to clipboard"
            >
              {copySuccess ? "Copied!" : "Copy Itinerary"}
            </button>
          </div>
          <div style={styles.resultCard}>
            <div style={styles.resultCardHeader}>
              <div style={styles.recommendationBadge}>AI Recommended</div>
              <div style={styles.tripDetails}>
                <span style={styles.tripDetailItem}>
                  <span style={styles.tripDetailIcon}>🌤️</span> {formData.weather.charAt(0).toUpperCase() + formData.weather.slice(1)}
                </span>
                <span style={styles.tripDetailItem}>
                  <span style={styles.tripDetailIcon}>📅</span> {formData.duration} days
                </span>
                <span style={styles.tripDetailItem}>
                  <span style={styles.tripDetailIcon}>👨‍👩‍👧‍👦</span> {formData.guestType.charAt(0).toUpperCase() + formData.guestType.slice(1)}
                </span>
                <span style={styles.tripDetailItem}>
                  <span style={styles.tripDetailIcon}>💰</span> {formData.budget.charAt(0).toUpperCase() + formData.budget.slice(1)} budget
                </span>
              </div>
            </div>
            <pre style={styles.preformatted}>{recommendations}</pre>
          </div>
        </div>
      )}
      
      <div style={styles.navigationFooter}>
        <Link to="/" style={styles.backButton}>
          <b>Back To Home</b>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" }
  },
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "0",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    marginTop: "50px",
    marginBottom: "50px",
    overflow: "hidden",
  },
  header: {
    position: "relative",
    padding: "30px 20px",
    background: "linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)",
    color: "white",
    textAlign: "center",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    opacity: 0.3,
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "5px",
    position: "relative",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  formContainer: {
    padding: "25px 30px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
    appearance: "none",
    backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23555\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "20px",
    outline: "none",
  },
  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px 20px",
    backgroundColor: "#ff6d00",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(255, 109, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
  },
  buttonDisabled: {
    width: "100%",
    marginTop: "25px",
    padding: "14px 20px",
    backgroundColor: "#bbbbbb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "none",
  },
  resultSection: {
    margin: "0 30px 30px",
    animation: "fadeIn 0.5s ease-in-out",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  resultTitle: {
    fontSize: "22px",
    fontWeight: "600",
    margin: "0",
    color: "#2e7d32",
  },
  copyButton: {
    backgroundColor: "#e0e0e0",
    color: "#424242",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  copyButtonSuccess: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    border: "1px solid #e9ecef",
    overflow: "hidden",
  },
  resultCardHeader: {
    backgroundColor: "#f8f9fa",
    padding: "15px 20px",
    borderBottom: "1px solid #e9ecef",
  },
  recommendationBadge: {
    display: "inline-block",
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "30px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(63, 81, 181, 0.2)",
  },
  tripDetails: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  tripDetailItem: {
    backgroundColor: "#f1f3f4",
    color: "#424242",
    fontSize: "13px",
    padding: "5px 10px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
  },
  tripDetailIcon: {
    marginRight: "5px",
  },
  preformatted: {
    whiteSpace: "pre-wrap",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#333",
    padding: "20px",
  },
  error: {
    margin: "0 30px 30px",
    padding: "15px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "14px",
    border: "1px solid #ffcdd2",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  navigationFooter: {
    padding: "20px 30px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    borderTop: "1px solid #eee",
  },
  backButton: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "30px",
    backgroundColor: "#333",
    color: "white",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
};

export default TravelRecommender;