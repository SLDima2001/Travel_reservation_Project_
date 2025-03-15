import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import BackButton from '../component/BackButton';
import Spinner from '../component/Spinner';

const ShowFeecback = () => {
  const [feedbacklist, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [rating, setRating] = useState(0);
  const [editingFeedback, setEditingFeedback] = useState(null); // State to hold the contact being edited
  const [updatedFeedback, setUpdatedFeedback] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    subject: '',
    message: '',
    rating: ''
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    setLoading(true);
    Axios.get('http://localhost:5555/feedback')
      .then((response) => {
        if (Array.isArray(response.data)) {
            setFeedbackList(response.data);
        } else {
            setFeedbackList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
        setLoading(false);
      });
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback); // Set the contact to be edited
    setUpdatedFeedback({
      firstname:feedback.firstname,
      lastname:feedback.lastname,
      email: feedback.email,
      phonenumber:feedback.phonenumber,
      subject:feedback.subject,
      message:feedback.message,
      rating:feedback.rating
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:5555/feedback/${editingFeedback._id}`, updatedFeedback);
      if (response.status === 200) {
        const updatedList = feedbacklist.map((feedback) =>
          feedback._id === editingFeedback._id ? { ...feedback, ...updatedFeedback } : feedback
        );
        setFeedbackList(updatedList); // Update the contact list with the modified contact
        setEditingFeedback(null); // Close the edit form
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
        const response = await Axios.delete(`http://localhost:5555/feedback/${id}`);
        if (response.status === 200) {
          setFeedbackList(feedbacklist.filter((feedback) => feedback._id !== id));
        } else {
          console.error("Failed to delete contact");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingFeedback(null); // Exit edit mode
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeedback((prev) => ({
      ...prev,
      [name]: value,
      
    }));
  };

  return (
    <div style={styles.container}>
     
      <h1 style={styles.heading}>All FeedBack Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.tableContainer}>
          {editingFeedback ? (
            <div>
              <h2 style={styles.editHeading}>Edit Feedback</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} style={styles.form}>
                <div style={styles.formGroup}>
                  <label>First Name:</label>
                  <input type="text" name="firstname" value={updatedFeedback.firstname} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Last Name:</label>
                  <input type="text" name="lastname" value={updatedFeedback.lastname} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Email:</label>
                  <input type="email" name="email" value={updatedFeedback.email} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Phone:</label>
                  <input type="number" name="phonenumber" value={updatedFeedback.phonenumber} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Subject:</label>
                  <input type="text" name="subject" value={updatedFeedback.subject} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>Message:</label>
                  <textarea type="text" name="message" value={updatedFeedback.message} onChange={handleChange} style={styles.textarea} />
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
                  <th style={styles.th}>Last Name</th>
                  <th style={styles.th}>E-Mail</th>
                  <th style={styles.th}>Phone Number</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Message</th>
                  <th style={styles.th}>rating</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(feedbacklist) && feedbacklist.length > 0 ? (
                  feedbacklist.map((feedback) => (
                    <tr key={feedback._id}>
                      <td style={styles.td}>{feedback._id}</td>
                      <td style={styles.td}>{feedback.firstname}</td>
                      <td style={styles.td}>{feedback.lastname}</td>
                      <td style={styles.td}>{feedback.email}</td>
                      <td style={styles.td}>{feedback.phonenumber}</td>
                      <td style={styles.td}>{feedback.subject}</td>
                      <td style={styles.td}>{feedback.message}</td>
                      <td style={styles.td}>{feedback.rating}</td>
                      <td style={styles.td}>
                        <button onClick={() => handleEdit(feedback)} style={styles.editButton}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(feedback._id)} style={styles.deleteButton}>
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
  
  heading: {
    textAlign: 'center',
    color: '#1e3a8a',
    fontSize: '2rem',
    marginBottom: '20px',
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
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  rated: {
    color: '#f39c12',
  },
  ratingStar: {
    
    fontSize: '70px',
    cursor: 'pointer',
    color: '#ccc',
  },
};

export default ShowFeecback;
