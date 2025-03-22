import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch All Saved Texts
  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/get-texts");
      setTexts(response.data);
    } catch (error) {
      console.error("Error fetching texts", error);
    }
  };

  // Save or Update Text
  const handleSave = async () => {
    try {
      if (selectedId) {
        await axios.put(`http://localhost:5555/api/update-text/${selectedId}`, { text });
        alert("Text updated successfully!");
      } else {
        await axios.post("http://localhost:5555/api/save-text", { text });
        alert("Text saved successfully!");
      }
      setText("");
      setSelectedId(null);
      fetchTexts();
    } catch (error) {
      console.error("Error saving text", error);
    }
  };

  // Load Selected Text for Editing
  const handleEdit = (id, text) => {
    setText(text);
    setSelectedId(id);
  };

  // Delete Text Entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/delete-text/${id}`);
      alert("Text deleted successfully!");
      fetchTexts();
    } catch (error) {
      console.error("Error deleting text", error);
    }
  };

  const styles = {
    container: {
      display: "flex",
      height: "auto",
      background: "#121212", // Dark background
      color: "#ffffff", // White text
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      background: "#222",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    sidebarItem: {
      padding: "15px",
      margin: "10px 0",
      background: "#444",
      cursor: "pointer",
      borderRadius: "5px",
      textAlign: "center",
      transition: "background 0.3s ease",
      color: "#ffffff", // White text for sidebar items
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      textAlign: "center",
      animation: "fadeIn 0.8s ease-in-out",
    },
    title: {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    saveBtn: {
      backgroundColor: "#4CAF50",
      color: "#fff",
      padding: "10px",
      border: "none",
      cursor: "pointer",
      margin: "5px",
    },
    cancelBtn: {
      backgroundColor: "#d9534f",
      color: "#fff",
      padding: "10px",
      border: "none",
      cursor: "pointer",
      margin: "5px",
    },
    discountText: {
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#1e1e1e", // Dark background for discount text
      color: "#ffffff",
      marginBottom: "10px",
      textAlign: "left",
      fontSize: "18px", // Default font size
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3>Admin Panel</h3>
        <div
          style={styles.sidebarItem}
          onClick={() => navigate("/admindashboard")}
        >
          Dashboard
        </div>
        <div
          style={styles.sidebarItem}
          onClick={() => navigate("/usershowpage")}
        >
          Users
        </div>
        <div
          style={styles.sidebarItem}
          onClick={() => navigate("/adminsignin")}
        >
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.title}>Add Discounts</h2>
        <ReactQuill theme="snow" value={text} onChange={setText} />
        <button
          onClick={handleSave}
          style={{
            marginTop: "10px",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {selectedId ? "Update Text" : "Save Text"}
        </button>

        <h3 style={{ marginTop: "20px", color: "#ffffff" }}>Saved Texts</h3>
        <ul style={{ textAlign: "left", padding: "0", listStyle: "none" }}>
          {texts.map((item) => (
            <li key={item._id} style={styles.discountText}>
              <div dangerouslySetInnerHTML={{ __html: item.text }} />
              <button
                onClick={() => handleEdit(item._id, item.text)}
                style={styles.saveBtn}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                style={styles.cancelBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateDiscount;