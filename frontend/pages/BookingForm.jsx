import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key
const stripePromise = loadStripe("pk_live_51Pbr4uRtnVjVgi993ZciYWjx1iywV1NUylMT5xaWaI3nSC8ErGzc3IBE6bui0a7iFHBJaLI5bka44thuwYV3AkA2006e5ejYeZ");

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    selectedPackage: '',
    persons: 1,
    fromDate: '',
    toDate: '',
    agreement: false,
  });

  const [packages, setPackages] = useState([
    { id: 1, name: '6 Days', price: 1100 },
    { id: 2, name: '8 Days', price: 1400 },
    { id: 3, name: '10 Days', price: 1650 },
    { id: 4, name: '12 Days', price: 1800 },
    { id: 5, name: '15 Days', price: 2049 },
    { id: 6, name: '18 Days', price: 2449 },
    { id: 7, name: '18 Days North &South', price: 2449 },
    { id: 8, name: '20 Days', price: 2689 },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [timePeriod, setTimePeriod] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const modalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
      setIsMobile(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Styles
  const styles = {
    app: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#e0f7fa',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#ADD8E6',
      color: 'black',
      position: 'relative',
    },
    logoImg: {
      height: 'auto',
      width:'120px',
      marginTop: '0px',
    },
    h1: {
      fontSize: '2em',
      margin: '0',
      color: '#333',
    },
    para: {
      color: 'black',
    },
    contactInfo: {
      marginLeft: 'auto',
    },
    backButton: {
      position: '',
      height:'70px',
      width:'100px',
      top: '20px',
      left: '20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1em',
      padding: '10px 15px',
      transition: 'background-color 0.3s ease',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: '1',
      padding: '20px',
      backgroundColor: '#ffffff',
    },
    formContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontSize: '1.3em',
      border: '2px solid #3498db',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      boxSizing: 'border-box',
      fontSize: '1em',
      border: '2px solid #3498db',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#4682B4',
      color: 'white',
      padding: '15px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1em',
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
    },
    summary: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontSize: '1.3em',
      marginBottom: '20%',
      marginRight:isMobile?'auto': 'auto',
      border: '2px solid #3498db',
    },
    termsContainer: {
      margin: '20px 0',
      textAlign: 'center',
      fontSize: '0.9em',
      borderTop: '1px solid #ddd',
      paddingTop: '10px',
    },
    termsButton: {
      color: '#3498db',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      width:''
    },
    modal: {
     // display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: isMobile? 'fixed':'none',
      left: '0',
      top: '0',
      width: isMobile ? '100%' : '80%', // Adjust width for mobile and PC views
      height:  isMobile ? '100%' : '80%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: '1000',
      transition: 'opacity 0.3s ease',
       display: isMobile ? 'flex' : 'block',
      flexDirection: isMobile ? 'row' : 'column'
    },
    modal1: {
       display: isMobile ? 'block' : 'none', // Hide on pc
       alignItems: 'center',
       justifyContent: 'center',
       position: isMobile? 'fixed':'none',
       left: '0',
       top: '0',
       width: isMobile ? '100%' : '80%', // Adjust width for mobile and PC views
       height:  isMobile ? '100%' : '80%',
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
       zIndex: '1000',
       transition: 'opacity 0.3s ease',

       flexDirection: isMobile ? 'row' : 'column'
     },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      height: isMobile? 'auto':'50%',
      maxWidth: isMobile? '900px':'500px',
      animation: 'fadeIn 0.5s ease-out',
      justifyContent: 'left',
      textAlign:'left',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '0em',
      cursor: 'pointer',
      color: '#3498db',
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    personButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.5em',
      padding: '10px 20px',
      margin: '0 5px',
      transition: 'background-color 0.3s ease',
    },
    personCount: {
      fontSize: '1.5em',
      margin: '0 10px',
    },
    checkbox: {
      width: '30px',
      height: '30px',
      marginRight: '10px',
    },
    additional1:{
     display: isMobile ? 'block' : 'none', // Hide on mobile
     height:isMobile?'auto':'600px',
     fontSize: isMobile ?  '10px' : '40px',
    },
    totalstyle:{
fontSize:isMobile?'1.5em':'3em'
    },
   

  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const makePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5555/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalAmount }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      //alert(result.error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      alert('Please agree to the terms before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to book tour');
      }

      alert('Booking successful!');
      await makePayment();
      Navigate("/")
    } catch (error) {
      console.error('Error booking tour:', error);
      //alert('Booking failed!');
    }
  };

  const calculateTotal = () => {
    const selectedPackage = packages.find(
      (pkg) => pkg.id === parseInt(formData.selectedPackage)
    );
    if (!selectedPackage) return 0;
    return selectedPackage.price * formData.persons;
  };

  const calculateTimePeriod = () => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTimePeriod(`${diffDays} Days`);
    } else {
      setTimePeriod('');
    }
  };

  const incrementPersons = () => {
    setFormData((prevData) => ({
      ...prevData,
      persons: prevData.persons + 1,
    }));
  };

  const decrementPersons = () => {
    setFormData((prevData) => ({
      ...prevData,
      persons: Math.max(1, prevData.persons - 1),
    }));
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [formData.selectedPackage, formData.persons]);

  useEffect(() => {
    calculateTimePeriod();
  }, [formData.fromDate, formData.toDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowTerms(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        
        <div>
          <img
            src="https://lahirutours.co.uk/photos/logo.gif"
            alt="Logo"
            style={styles.logoImg}
          />
          <div>
            <h1 style={styles.h1}>Booking Form</h1>
            <p style={styles.para}>Book your dream tour today!</p>
          </div>
        </div>
        <div style={styles.contactInfo}>
          <p></p>
        </div>
      </header>
      <button
          type="button"
          onClick={() => window.history.back()}
          style={styles.backButton}
        >
          &larr; Back
        </button>
      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          
          <h2><b>Book Your Tour</b></h2>


          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <select
              name="selectedPackage"
              value={formData.selectedPackage}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - ${pkg.price}
                </option>
              ))}
            </select>
            <h1>Persons</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button type="button" onClick={decrementPersons} style={styles.personButton}>-</button>
              <span style={styles.personCount}>{formData.persons}</span>
              <button type="button" onClick={incrementPersons} style={styles.personButton}>+</button>
            </div>
            <label>From Date: </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              min={getTodayDate()}
              style={styles.input}
              required
            />
            <label>To Date: </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              min={getTodayDate()}
              style={styles.input}
              required
            />
            

            {/* Terms and Conditions Button */}
            <div style={styles.termsContainer}>
              <label>
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  style={styles.termsButton}
                >
                  terms and conditions
                </button>
              </label>
            </div>
            <div>
              <p style={{color:'gray',fontSize:'12px'}}>
                Payment Security Notice
Your security is our top priority. We use advanced encryption technology to ensure that your payment details are processed securely through Stripe’s global payment integration. Rest assured, all transactions are protected with the highest level of security.

If you have any concerns or need assistance, please contact us at <br /><u>payments@travelsrilanka.co.uk.</u><br />

Thank you for choosing Travel Sri Lanka. Your safety and privacy are paramount to us.

Warm regards,
The Travel Sri Lanka Team
              </p>
            </div>

            <button type="submit" style={styles.button}>
              Book Now
            </button>
          </form>
        </div>

        <div style={styles.summary}>
          <h2>Summary</h2>
          <p>Time Period: {timePeriod}</p>
          <p>Total Amount: </p>
          <p style={styles.totalstyle}>${totalAmount}</p>
        </div>
      </div>

      {/* Modal for Terms and Conditions */}
      {showTerms && (
        <div style={styles.modal}>
          <div ref={modalRef} style={styles.modalContent}>
            <button
              type="button"
              onClick={() => setShowTerms(false)}
              style={styles.closeButton}
            >
              &times;
            </button>
            <div style={styles.additional1}>
            <h3><u>Terms and Conditions</u></h3>
            <p><b>1.Introduction
Welcome to Lahiru Tours</b>. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing our website and making a payment, you agree to comply with these Terms. Please read them carefully.
</p><br />
            <p><b>2.Booking and Payment</b>
•	Payment Methods: We accept major credit and debit cards through our secure payment gateway, powered by Stripe.
•	Payment Security: <b>All transactions are encrypted and securely processed through Stripe to ensure the protection of your payment details.
•	Payment Confirmation: Upon successful payment, you will receive a confirmation email with your booking details.</b>
</p><br />
            
            <p><b>3. Cancellations and Refunds</b>
•	Cancellation Policy: Cancellations must be made in writing via email to <u>admin@lahirutours.co.uk</u>. The following cancellation fees apply:
	30 days or more before the departure date: 95% refund minus any non-refundable expenses incurred.
	15-29 days before the departure date: 50% refund.
	Less than 15 days before the departure date: No refund.
•	Refund Processing: Refunds will be processed within 14 business days of receiving the cancellation request.
</p>
            <p><b>4. Changes to Bookings</b>
•	Amendments: Any changes to your booking must be requested in writing. We will do our best to accommodate your request but cannot guarantee availability. Additional charges may apply.
•	Substitutions: In the event of unforeseen circumstances, Lahiru Tours reserves the right to substitute accommodations, activities, or other services with alternatives of equal or greater value.
</p>
            <p><b>5. Travel Insurance</b>
•	Requirement: We strongly recommend that all travelers purchase comprehensive travel insurance covering cancellations, medical expenses, personal liability, and loss of personal belongings.
</p>
            <p><b>6.  Liability</b>
•	Limitation of Liability: Lahiru Tours shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
•	Force Majeure: Lahiru Tours shall not be liable for any failure to perform its obligations where such failure results from circumstances beyond our control, including but not limited to natural disasters, war, or government restrictions.
</p>
<p><b>7.Travel Documentation</b>
•	Passports and Visas: It is the traveler’s responsibility to ensure they have valid travel documentation, including passports and visas, if required.
•	Health Requirements: Travelers are responsible for complying with any health requirements, including vaccinations, necessary for their destination.
</p>
<p><b>8.Contact Information</b>
For any questions or concerns regarding these Terms, please contact us at:
Lahiru Tours
Email: <u>admin@lahirutours.co.uk</u>
</p>
<p><b>9.Amendments</b>
Lahiru Tours reserves the right to amend these Terms at any time. Any changes will be posted on our website and will become effective immediately upon posting. Your continued use of our services after such amendments constitutes your acceptance of the new Terms.
Thank you for choosing Lahiru Tours. We look forward to making your travel experience unforgettable.</p>
</div>



<br /><br />
            <label style={{fontSize:'2em',textAlign:'center'}}>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              I agree to these terms and conditions
            </label>
          </div>
        </div>
      )}

 
      

      
    </div>
  );
}

export default BookingForm;

