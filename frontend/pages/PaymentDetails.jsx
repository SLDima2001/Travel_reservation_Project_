import React, { useEffect, useState } from "react";
import BackButton from "../component/BackButton";

const PaymentDetails = () => {
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Payment Details</h2>
      <BackButton/>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Package</th>
              <th>Persons</th>
              <th>From</th>
              <th>To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.phoneNumber}</td>
                <td>{payment.selectedPackage}</td>
                <td>{payment.persons}</td>
                <td>{new Date(payment.fromDate).toLocaleDateString()}</td>
                <td>{new Date(payment.toDate).toLocaleDateString()}</td>
                <td>
                  <button style={styles.editBtn} onClick={() => handleEditClick(payment)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(payment._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingPayment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Payment</h3>
            <form onSubmit={handleEditSubmit}>
              <input type="text" name="name" value={editData.name} onChange={handleEditChange} required />
              <input type="email" name="email" value={editData.email} onChange={handleEditChange} required />
              <input type="number" name="phoneNumber" value={editData.phoneNumber} onChange={handleEditChange} required />
              <input type="text" name="selectedPackage" value={editData.selectedPackage} onChange={handleEditChange} required />
              <input type="number" name="persons" value={editData.persons} onChange={handleEditChange} required />
              <input type="date" name="fromDate" value={editData.fromDate} onChange={handleEditChange} required />
              <input type="date" name="toDate" value={editData.toDate} onChange={handleEditChange} required />
              <button type="submit" style={styles.saveBtn}>Save</button>
              <button onClick={() => setEditingPayment(null)} style={styles.cancelBtn}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
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
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
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
    backgroundColor: "#fff",
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

export default PaymentDetails;
