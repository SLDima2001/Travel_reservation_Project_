import React from 'react';
import { Link } from 'react-router-dom';

function PaymentCancel() {
  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '50px',
      backgroundColor: '#e0f7fa',
    },
    heading: {
      fontSize: '2em',
      color: '#f44336',
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
      <h1 style={styles.heading}>Payment Canceled</h1>
      <p style={styles.paragraph}>It looks like the payment was canceled. Please try again or contact support if you need assistance.</p>
      <Link to="/" style={styles.button}>Back to Home</Link>
    </div>
  );
}

export default PaymentCancel;
