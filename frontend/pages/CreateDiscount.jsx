import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const CreateDiscount = () => {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // 📌 Fetch All Saved Texts
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

  // 📌 Save or Update Text
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

  // 📌 Load Selected Text for Editing
  const handleEdit = (id, text) => {
    setText(text);
    setSelectedId(id);
  };

  // 📌 Delete Text Entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/delete-text/${id}`);
      alert("Text deleted successfully!");
      fetchTexts();
    } catch (error) {
      console.error("Error deleting text", error);
    }
  };

  return (
    <div style={{ width: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2 style={{ transition: "opacity 0.5s ease-in-out", opacity: "1" }}>Add Discounts</h2>
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button
        onClick={handleSave}
        style={{
          marginTop: "10px",
          padding: "10px",
          cursor: "pointer",
          transition: "background 0.3s ease, transform 0.2s ease",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        {selectedId ? "Update Text" : "Save Text"}
      </button>

      <h3 style={{ marginTop: "20px" }}>Saved Texts</h3>
      <ul style={{ textAlign: "left", padding: "0", listStyle: "none" }}>
        {texts.map((item, index) => (
          <li
            key={item._id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
              transition: "transform 0.3s ease, opacity 0.5s ease-in-out",
              opacity: 1,
              transform: `translateY(${index * 5}px)`,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
            <button
              onClick={() => handleEdit(item._id, item.text)}
              style={{
                marginLeft: "10px",
                transition: "background 0.3s ease, transform 0.2s ease",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0073a1")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                marginLeft: "10px",
                transition: "background 0.3s ease, transform 0.2s ease",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "darkred")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "red")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateDiscount;
