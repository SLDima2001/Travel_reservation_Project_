import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import BackButton from '../component/BackButton';
import Spinner from '../component/Spinner';

const ShowContactUs = () => {
  const [contactusList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingContact, setEditingContact] = useState(null); // State to hold the contact being edited
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
    setEditingContact(contact); // Set the contact to be edited
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
        setContactList(updatedList); // Update the contact list with the modified contact
        setEditingContact(null); // Close the edit form
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
    setEditingContact(null); // Exit edit mode
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prev) => ({
      ...prev,
      [name]: value,
      

    }));
  };

  return (
    
    <div style={styles.container}>
      <BackButton/>
      <h1 style={styles.heading}>All Contact Us Details</h1>
      
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.tableContainer}>
          {editingContact ? (
            <div>
              <h2 style={styles.editHeading}>Edit Contact</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} style={styles.form}>
                <div style={styles.formGroup}>
                  <label>Name:</label>
                  <input type="text" name="name" value={updatedContact.name} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Email:</label>
                  <input type="email" name="email" value={updatedContact.email} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Phone:</label>
                  <input type="text" name="phone" value={updatedContact.phone} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Subject:</label>
                  <input type="text" name="subject" value={updatedContact.subject} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Message:</label>
                  <textarea name="message" value={updatedContact.message} onChange={handleChange} style={styles.textarea} />
                </div>
                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.saveButton}>Save Changes</button>
                  <button type="button" onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
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
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f3f4f6',
  },
  heading: {
    textAlign: 'center',
    color: '#1e3a8a',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '10px',
    transition: 'background-color 0.3s ease',
  },
  tableContainer: {
    padding: '16px',
    maxWidth: 'auto',
    margin: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  editHeading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '1.8rem',
    marginBottom: '20px',
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
    border: '1px solid #ddd',
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
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  input: {
    padding: '10px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    width: '100%',
    height: '150px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  buttonGroup: {
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '1.2rem',
    color: '#777',
  },
};

export default ShowContactUs;
