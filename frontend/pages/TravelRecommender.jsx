import React, { useState } from "react";
import axios from "axios";

const TravelRecommender = () => {
    // State variables for user inputs and AI response
    const [weather, setWeather] = useState("sunny");
    const [duration, setDuration] = useState("");
    const [interests, setInterests] = useState("");
    const [recommendations, setRecommendations] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to get recommendations directly from OpenAI API
    const getRecommendations = async () => {
        if (!duration || !interests) {
            alert("Please enter all details.");
            return;
        }

        // Validate duration (positive number) and interests (non-empty)
        if (parseInt(duration) <= 0) {
            alert("Duration must be a positive number.");
            return;
        }

        const trimmedInterests = interests.trim();
        if (trimmedInterests.length === 0) {
            alert("Please provide your interests.");
            return;
        }

        setLoading(true);
        setRecommendations(""); // Reset recommendations before fetching

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/completions", // OpenAI API endpoint
                {
                    model: "gpt-4o", // Specify the model
                    prompt: `Suggest a travel plan for a ${weather} weather, ${duration}-day stay, with interests in ${trimmedInterests}.`,
                    max_tokens: 150,
                },
                {
                    headers: {
                        "Authorization": `Bearer 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`, // Replace with your OpenAI API key
                        "Content-Type": "application/json",
                    }
                }
            );

            setRecommendations(response.data.choices[0].text.trim());
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

            {/* Weather Input */}
            <label style={styles.label}>Preferred Weather:</label>
            <select
                style={styles.input}
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
            >
                <option value="sunny">Sunny</option>
                <option value="rainy">Rainy</option>
                <option value="cool">Cool</option>
            </select>

            {/* Duration Input */}
            <label style={styles.label}>Duration of Stay (days):</label>
            <input
                type="number"
                style={styles.input}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
            />

            {/* Interests Input */}
            <label style={styles.label}>Your Interests (comma separated):</label>
            <input
                type="text"
                style={styles.input}
                placeholder="Beaches, wildlife, history..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
            />

            {/* Button to fetch recommendations */}
            <button
                style={styles.button}
                onClick={getRecommendations}
                disabled={loading}
            >
                {loading ? "Loading..." : "Get Recommendations"}
            </button>

            {/* Display recommendations */}
            {recommendations && <div style={styles.result}>{recommendations}</div>}
        </div>
    );
};

// Styles for the component
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
    result: {
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#e3f2fd",
        borderRadius: "5px",
        fontWeight: "bold",
    },
};

export default TravelRecommender;
