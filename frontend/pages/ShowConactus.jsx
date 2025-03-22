import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../component/Spinner';

const ShowContactUs = () => {
  const navigate = useNavigate();
  const [contactusList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    Axios.get('http://localhost:5555/contact')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setContactList(response.data);
        } else {
          setContactList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
        setLoading(false);
      });
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setUpdatedContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:5555/contact/${editingContact._id}`, updatedContact);
      if (response.status === 200) {
        const updatedList = contactusList.map((contact) =>
          contact._id === editingContact._id ? { ...contact, ...updatedContact } : contact
        );
        setContactList(updatedList);
        setEditingContact(null);
      } else {
        console.error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await Axios.delete(`http://localhost:5555/contact/${id}`);
        if (response.status === 200) {
          setContactList(contactusList.filter((contact) => contact._id !== id));
        } else {
          console.error("Failed to delete contact");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      background: "#1e1e1e", // Darker sidebar
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
      transition: "all 0.3s ease",
    },
    sidebarItem: {
      padding: "15px",
      margin: "10px 0",
      background: "#333", // Darker item background
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
    tableContainer: {
      padding: '16px',
      maxWidth: 'auto',
      margin: 'auto',
      backgroundColor: '#1e1e1e', // Dark background for table container
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
      borderRadius: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    th: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '1.1rem',
    },
    td: {
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #444', // Darker border
      color: '#ffffff', // White text for table data
    },
    editButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
    },
    noData: {
      textAlign: 'center',
      padding: '10px',
      fontSize: '1.2rem',
      color: '#777',
    },
    input: {
      padding: '10px',
      width: '100%',
      border: '1px solid #444', // Darker border for inputs
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#333', // Dark background for inputs
      color: '#ffffff', // White text for inputs
    },
    textarea: {
      padding: '10px',
      width: '100%',
      height: '150px',
      border: '1px solid #444', // Darker border for textarea
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#333', // Dark background for textarea
      color: '#ffffff', // White text for textarea
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3>Admin Panel</h3>
        <div style={styles.sidebarItem} onClick={() => navigate("/admindashboard")}>
          Dashboard
        </div>
        <div style={styles.sidebarItem} onClick={() => navigate("/usershowpage")}>
          Users
        </div>
        <div style={styles.sidebarItem} onClick={() => navigate("/adminsignin")}>
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1>All Contact Us Details</h1>
        
        {loading ? (
          <Spinner />
        ) : (
          <div style={styles.tableContainer}>
            {editingContact ? (
              <div>
                <h2>Edit Contact</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                  <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={updatedContact.name} onChange={handleChange} style={styles.input} />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={updatedContact.email} onChange={handleChange} style={styles.input} />
                  </div>
                  <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={updatedContact.phone} onChange={handleChange} style={styles.input} />
                  </div>
                  <div>
                    <label>Subject:</label>
                    <input type="text" name="subject" value={updatedContact.subject} onChange={handleChange} style={styles.input} />
                  </div>
                  <div>
                    <label>Message:</label>
                    <textarea name="message" value={updatedContact.message} onChange={handleChange} style={styles.textarea} />
                  </div>
                  <div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>E-Mail</th>
                    <th style={styles.th}>Phone Number</th>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(contactusList) && contactusList.length > 0 ? (
                    contactusList.map((contactus) => (
                      <tr key={contactus._id}>
                        <td style={styles.td}>{contactus._id}</td>
                        <td style={styles.td}>{contactus.name}</td>
                        <td style={styles.td}>{contactus.email}</td>
                        <td style={styles.td}>{contactus.phone}</td>
                        <td style={styles.td}>{contactus.subject}</td>
                        <td style={styles.td}>{contactus.message}</td>
                        <td style={styles.td}>
                          <button onClick={() => handleEdit(contactus)} style={styles.editButton}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(contactus._id)} style={styles.deleteButton}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={styles.noData}>No contact details found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowContactUs;