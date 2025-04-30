import React from 'react';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '50px',
      backgroundColor: '#e0f7fa',
    },
    heading: {
      fontSize: '2em',
      color: '#4caf50',
    },
    paragraph: {
      fontSize: '1.2em',
      color: '#333',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '1em',
      color: 'white',
      backgroundColor: '#333',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Successful!</h1>
      <p style={styles.paragraph}>Thank you for your purchase. Your booking has been confirmed.</p>
      <Link to="/" style={styles.button}>Back to Home</Link>
    </div>
  );
}

export default PaymentSuccess;
