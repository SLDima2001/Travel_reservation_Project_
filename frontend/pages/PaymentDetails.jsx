import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";
import html2pdf from "html2pdf.js";  // Import html2pdf.js

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPayment, setEditingPayment] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedPackage: "",
    persons: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:5555/payment")
      .then((response) => response.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5555/payment/${id}`, {
        method: "DELETE",
      });
      setPayments(payments.filter((payment) => payment._id !== id));
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment._id);
    setEditData({
      name: payment.name,
      email: payment.email,
      phoneNumber: payment.phoneNumber,
      selectedPackage: payment.selectedPackage,
      persons: payment.persons,
      fromDate: payment.fromDate.split("T")[0],
      toDate: payment.toDate.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5555/payment/${editingPayment}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      setPayments(
        payments.map((payment) =>
          payment._id === editingPayment ? { ...payment, ...editData } : payment
        )
      );
      setEditingPayment(null);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content");  // Select the content to be converted to PDF

    // Use html2pdf.js to generate the PDF
    html2pdf()
      .from(element)
      .save("payment_details.pdf");
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
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    loading: {
      fontSize: "18px",
      color: "#555",
    },
    table: {
      width: "80%",
      margin: "0 auto",
      borderCollapse: "collapse",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#1e1e1e", // Dark background for table
      borderRadius: "10px",
      overflow: "hidden",
    },
    th: {
      padding: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
      fontSize: "1.1rem",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      border: "1px solid #444", // Darker border
      color: "#ffffff", // White text for table data
    },
    editBtn: {
      backgroundColor: "#ffa500",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      marginRight: "5px",
      transition: "0.3s",
    },
    deleteBtn: {
      backgroundColor: "#ff4d4d",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      transition: "0.3s",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      backgroundColor: "#1e1e1e", // Dark background for modal
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
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
        <h2 style={styles.title}>Customer Payment Details</h2>

        <button
          onClick={generatePDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Generate PDF
        </button>

        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <div id="pdf-content"> {/* Wrapping content inside an ID for html2pdf */}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Package</th>
                  <th style={styles.th}>Persons</th>
                  <th style={styles.th}>From</th>
                  <th style={styles.th}>To</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td style={styles.td}>{payment.name}</td>
                    <td style={styles.td}>{payment.email}</td>
                    <td style={styles.td}>{payment.phoneNumber}</td>
                    <td style={styles.td}>{payment.selectedPackage}</td>
                    <td style={styles.td}>{payment.persons}</td>
                    <td style={styles.td}>{new Date(payment.fromDate).toLocaleDateString()}</td>
                    <td style={styles.td}>{new Date(payment.toDate).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <button style={styles.editBtn} onClick={() => handleEditClick(payment)}>Edit</button>
                      <button style={styles.deleteBtn} onClick={() => handleDelete(payment._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
