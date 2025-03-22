import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserShowpage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/auth/users");
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      setError("Error fetching users");
      console.error("Fetch Users Error:", err);
    }
    setLoading(false);
  };

  // Delete User
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:5555/api/auth/users/${id}`);
        if (response.data.success) {
          setUsers(users.filter((user) => user._id !== id));
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Delete User Error:", error);
        alert("Error deleting user");
      }
    }
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
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
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    message: {
      fontSize: "18px",
      color: "#ffffff",
    },
    table: {
      width: "80%",
      margin: "0 auto",
      borderCollapse: "collapse",
      background: "#1e1e1e", // Dark background for table
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      overflow: "hidden",
    },
    th: {
      background: "#4CAF50",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      border: "1px solid #444", // Darker border
      color: "#ffffff", // White text for table data
    },
    deleteButton: {
      background: "red",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "background 0.3s ease",
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
        <h2 style={styles.title}>Registered Users</h2>

        {loading ? (
          <p style={styles.message}>Loading users...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: "red" }}>{error}</p>
        ) : users.length === 0 ? (
          <p style={styles.message}>No users found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <button style={styles.deleteButton} onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserShowpage;