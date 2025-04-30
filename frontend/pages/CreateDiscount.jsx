import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [filteredTexts, setFilteredTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/get-texts");
      setTexts(response.data);
      setFilteredTexts(response.data);
    } catch (error) {
      console.error("Error fetching texts", error);
    }
  };

  const handleSave = async () => {
    try {
      const payload = { text };
      if (selectedId) {
        await axios.put(`http://localhost:5555/api/update-text/${selectedId}`, payload);
        alert("Text updated successfully!");
      } else {
        await axios.post("http://localhost:5555/api/save-text", payload);
        alert("Text saved successfully!");
      }
      resetForm();
      fetchTexts();
    } catch (error) {
      console.error("Error saving text", error);
    }
  };

  const resetForm = () => {
    setText("");
    setSelectedId(null);
  };

  const handleEdit = (id, text) => {
    setText(text);
    setSelectedId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/delete-text/${id}`);
      alert("Text deleted successfully!");
      fetchTexts();
    } catch (error) {
      console.error("Error deleting text", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredTexts(texts);
    } else {
      const filtered = texts.filter((item) =>
        item.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTexts(filtered);
    }
  };

  const generatePDF = () => {
    const input = contentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("discount_texts.pdf");
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const styles = {
    container: {
      display: "flex",
      height: "auto",
      background: "#121212",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      background: "#222",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
    },
    sidebarItem: {
      padding: "15px",
      margin: "10px 0",
      background: "#444",
      cursor: "pointer",
      borderRadius: "5px",
      textAlign: "center",
      color: "#ffffff",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      textAlign: "center",
    },
    editorContainer: {
      background: "#fff",
      color: "#000",
      borderRadius: "5px",
      padding: "10px",
    },
    button: {
      margin: "10px",
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      color: "white",
    },
    searchInput: {
      padding: "10px",
      width: "60%",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor:'black'
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>Admin Panel</h3>
        <div style={styles.sidebarItem} onClick={() => navigate("/admindashboard")}>Dashboard</div>
        <div style={styles.sidebarItem} onClick={() => navigate("/usershowpage")}>Users</div>
        <div style={styles.sidebarItem} onClick={() => navigate("/adminsignin")}>Logout</div>
      </div>

      <div style={styles.mainContent}>
        <h2>Add Discounts</h2>

        <div style={styles.editorContainer}>
          <ReactQuill value={text} onChange={setText} modules={modules} theme="snow" />
        </div>

        <button
          onClick={handleSave}
          style={{ ...styles.button, backgroundColor: "#4CAF50" }}
        >
          {selectedId ? "Update Text" : "Save Text"}
        </button>

        <button
          onClick={generatePDF}
          style={{ ...styles.button, backgroundColor: "#007bff" }}
        >
          Generate PDF
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search texts..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div ref={contentRef} style={{ textAlign: "left", marginTop: "20px", background: "#1e1e1e", padding: "10px", borderRadius: "5px" }}>
          <h3>Saved Texts:</h3>
          {filteredTexts.length > 0 ? (
            filteredTexts.map((item) => (
              <div key={item._id} style={{ background: "#333", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
                <button onClick={() => handleEdit(item._id, item.text)} style={{ ...styles.button, backgroundColor: "#ff9800" }}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={{ ...styles.button, backgroundColor: "#d9534f" }}>Delete</button>
              </div>
            ))
          ) : (
            <p>No matching results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDiscount;
