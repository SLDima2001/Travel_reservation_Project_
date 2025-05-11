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

  // Packages data
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modernized styles
  const styles = {
    app: {
      fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif',
      backgroundColor: '#f5f7ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: '#3a86ff',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    logoImg: {
      height: 'auto',
      width: '120px',
      borderRadius: '10px',
    },
    h1: {
      fontSize: isMobile ? '1.5em' : '2.2em',
      margin: '0',
      fontWeight: '600',
    },
    para: {
      color: 'white',
      opacity: '0.9',
      margin: '5px 0 0 0',
      fontSize: '1.1em',
    },
    backButton: {
      backgroundColor: '#fff',
      color: '#3a86ff',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '1em',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '600',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      position: 'absolute',
      top: '30px',
      left: '40px',
    },
    mainContent: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      gap: '30px',
      padding: '40px',
      flex: '1',
    },
    formContainer: {
      flex: '1',
      maxWidth: isMobile ? '100%' : '600px',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff',
      border: 'none',
    },
    formTitle: {
      fontSize: '1.8em',
      color: '#333',
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: '700',
    },
    formSection: {
      marginBottom: '25px',
    },
    formLabel: {
      display: 'block',
      fontSize: '1em',
      color: '#555',
      marginBottom: '8px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '14px',
      marginBottom: '20px',
      boxSizing: 'border-box',
      fontSize: '1em',
      border: '1px solid #e1e5ee',
      borderRadius: '8px',
      transition: 'border 0.3s ease',
      backgroundColor: '#f9fafd',
    },
    select: {
      width: '100%',
      padding: '14px',
      marginBottom: '20px',
      boxSizing: 'border-box',
      fontSize: '1em',
      border: '1px solid #e1e5ee',
      borderRadius: '8px',
      backgroundColor: '#f9fafd',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px top 50%',
      backgroundSize: '12px auto',
    },
    dateContainer: {
      marginBottom: '20px',
    },
    personSelector: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '25px',
      gap: '15px',
    },
    personButton: {
      backgroundColor: '#edf2ff',
      color: '#3a86ff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      fontSize: '1.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    personCount: {
      fontSize: '1.5em',
      color: '#333',
      fontWeight: '600',
      width: '40px',
      textAlign: 'center',
    },
    termsContainer: {
      margin: '20px 0',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e1e5ee',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      accentColor: '#3a86ff',
    },
    termsButton: {
      color: '#3a86ff',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      padding: '0',
      fontSize: '1em',
      fontWeight: '500',
    },
    securityNotice: {
      fontSize: '0.85em',
      color: '#666',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px',
      marginTop: '20px',
      borderLeft: '4px solid #3a86ff',
    },
    button: {
      backgroundColor: '#3a86ff',
      color: 'white',
      padding: '16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.1em',
      fontWeight: '600',
      width: '100%',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 10px rgba(58, 134, 255, 0.3)',
    },
    summary: {
      width: isMobile ? '100%' : '350px',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff',
      alignSelf: 'flex-start',
      position: 'sticky',
      top: '40px',
    },
    summaryTitle: {
      fontSize: '1.8em',
      color: '#333',
      marginBottom: '20px',
      fontWeight: '700',
      textAlign: 'center',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '1.1em',
      color: '#555',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '2px solid #e1e5ee',
      marginTop: '20px',
      paddingTop: '20px',
      fontSize: '1.5em',
      fontWeight: '700',
      color: '#333',
    },
    modal: {
      display: showTerms ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: '1000',
      transition: 'opacity 0.3s ease',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '16px',
      maxWidth: isMobile ? '90%' : '600px',
      maxHeight: '80vh',
      overflow: 'auto',
      position: 'relative',
      animation: 'fadeIn 0.5s ease-out',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      fontSize: '1.5em',
      cursor: 'pointer',
      color: '#3a86ff',
    },
    termsHeading: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '20px',
      fontWeight: '700',
      borderBottom: '2px solid #e1e5ee',
      paddingBottom: '10px',
    },
    termsSectionTitle: {
      fontSize: '1.2em',
      color: '#333',
      marginTop: '20px',
      marginBottom: '10px',
      fontWeight: '600',
    },
    termsParagraph: {
      fontSize: '1em',
      color: '#555',
      marginBottom: '15px',
      lineHeight: '1.6',
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(-20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
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
        <div style={styles.headerContent}>
          <img
            src="./images/logo.jpeg"
            alt="Logo"
            style={styles.logoImg}
          />
          <div>
            <h1 style={styles.h1}>Booking Form</h1>
            <p style={styles.para}>Book your dream tour today!</p>
          </div>
        </div>
      </header>
     
      <button
        type="button"
        onClick={() => window.history.back()}
        style={styles.backButton}
      >
        <span>←</span> Back
      </button>
     
      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Book Your Tour</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Personal Information</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Tour Details</label>
              <select
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ${pkg.price}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Number of Travelers</label>
              <div style={styles.personSelector}>
                <button type="button" onClick={decrementPersons} style={styles.personButton}>-</button>
                <span style={styles.personCount}>{formData.persons}</span>
                <button type="button" onClick={incrementPersons} style={styles.personButton}>+</button>
              </div>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Travel Dates</label>
              <div style={styles.dateContainer}>
                <label style={{...styles.formLabel, fontSize: '0.9em', marginBottom: '5px'}}>From Date:</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.dateContainer}>
                <label style={{...styles.formLabel, fontSize: '0.9em', marginBottom: '5px'}}>To Date:</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.termsContainer}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                  id="agreement"
                  required
                />
                <label htmlFor="agreement">
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
            </div>
           
            <div style={styles.securityNotice}>
              <strong>Payment Security Notice</strong>
              <p style={{margin: '10px 0'}}>
                Your security is our top priority. We use advanced encryption technology to ensure that your payment details are processed securely through Stripe's global payment integration. Rest assured, all transactions are protected with the highest level of security.
              </p>
              <p style={{margin: '10px 0'}}>
                If you have any concerns or need assistance, please contact us at <a href="mailto:payments@travelsrilanka.co.uk" style={{color: '#3a86ff'}}>payments@travelsrilanka.co.uk</a>.
              </p>
              <p style={{margin: '10px 0'}}>
                Thank you for choosing Travel Sri Lanka. Your safety and privacy are paramount to us.
              </p>
              <p style={{margin: '10px 0 0'}}>
                Warm regards,<br />
                The Travel Sri Lanka Team
              </p>
            </div>

            <button type="submit" style={styles.button} >
              Book Now
            </button>
          </form>
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Booking Summary</h2>
         
          {formData.selectedPackage && (
            <div style={styles.summaryItem}>
              <span>Package:</span>
              <span>{packages.find(pkg => pkg.id === parseInt(formData.selectedPackage))?.name}</span>
            </div>
          )}
         
          {formData.persons > 0 && (
            <div style={styles.summaryItem}>
              <span>Travelers:</span>
              <span>{formData.persons}</span>
            </div>
          )}
         
          {timePeriod && (
            <div style={styles.summaryItem}>
              <span>Duration:</span>
              <span>{timePeriod}</span>
            </div>
          )}
         
          {(formData.fromDate && formData.toDate) && (
            <div style={styles.summaryItem}>
              <span>Travel Dates:</span>
              <span>{new Date(formData.fromDate).toLocaleDateString()} - {new Date(formData.toDate).toLocaleDateString()}</span>
            </div>
          )}
         
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Modal for Terms and Conditions */}
      <div style={styles.modal}>
        <div ref={modalRef} style={styles.modalContent}>
          <button
            type="button"
            onClick={() => setShowTerms(false)}
            style={styles.closeButton}
          >
            ×
          </button>
         
          <h3 style={styles.termsHeading}>Terms and Conditions</h3>
         
          <h4 style={styles.termsSectionTitle}>1. Introduction</h4>
          <p style={styles.termsParagraph}>
            Welcome to Lahiru Tours. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing our website and making a payment, you agree to comply with these Terms. Please read them carefully.
          </p>
         
          <h4 style={styles.termsSectionTitle}>2. Booking and Payment</h4>
          <p style={styles.termsParagraph}>
            • Payment Methods: We accept major credit and debit cards through our secure payment gateway, powered by Stripe.<br />
            • Payment Security: All transactions are encrypted and securely processed through Stripe to ensure the protection of your payment details.<br />
            • Payment Confirmation: Upon successful payment, you will receive a confirmation email with your booking details.
          </p>
         
          <h4 style={styles.termsSectionTitle}>3. Cancellations and Refunds</h4>
          <p style={styles.termsParagraph}>
            • Cancellation Policy: Cancellations must be made in writing via email to <a href="mailto:admin@lahirutours.co.uk" style={{color: '#3a86ff'}}>admin@lahirutours.co.uk</a>. The following cancellation fees apply:<br />
            &nbsp;&nbsp;- 30 days or more before the departure date: 95% refund minus any non-refundable expenses incurred.<br />
            &nbsp;&nbsp;- 15-29 days before the departure date: 50% refund.<br />
            &nbsp;&nbsp;- Less than 15 days before the departure date: No refund.<br />
            • Refund Processing: Refunds will be processed within 14 business days of receiving the cancellation request.
          </p>
         
          <h4 style={styles.termsSectionTitle}>4. Changes to Bookings</h4>
          <p style={styles.termsParagraph}>
            • Amendments: Any changes to your booking must be requested in writing. We will do our best to accommodate your request but cannot guarantee availability. Additional charges may apply.<br />
            • Substitutions: In the event of unforeseen circumstances, Lahiru Tours reserves the right to substitute accommodations, activities, or other services with alternatives of equal or greater value.
          </p>
         
          <h4 style={styles.termsSectionTitle}>5. Travel Insurance</h4>
          <p style={styles.termsParagraph}>
            • Requirement: We strongly recommend that all travelers purchase comprehensive travel insurance covering cancellations, medical expenses, personal liability, and loss of personal belongings.
          </p>
         
          <h4 style={styles.termsSectionTitle}>6. Liability</h4>
          <p style={styles.termsParagraph}>
            • Limitation of Liability: Lahiru Tours shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.<br />
            • Force Majeure: Lahiru Tours shall not be liable for any failure to perform its obligations where such failure results from circumstances beyond our control, including but not limited to natural disasters, war, or government restrictions.
          </p>
         
          <h4 style={styles.termsSectionTitle}>7. Travel Documentation</h4>
          <p style={styles.termsParagraph}>
            • Passports and Visas: It is the traveler's responsibility to ensure they have valid travel documentation, including passports and visas, if required.<br />
            • Health Requirements: Travelers are responsible for complying with any health requirements, including vaccinations, necessary for their destination.
          </p>
         
          <h4 style={styles.termsSectionTitle}>8. Contact Information</h4>
          <p style={styles.termsParagraph}>
            For any questions or concerns regarding these Terms, please contact us at:<br />
            Lahiru Tours<br />
            Email: <a href="mailto:admin@lahirutours.co.uk" style={{color: '#3a86ff'}}>admin@lahirutours.co.uk</a>
          </p>
         
          <h4 style={styles.termsSectionTitle}>9. Amendments</h4>
          <p style={styles.termsParagraph}>
            Lahiru Tours reserves the right to amend these Terms at any time. Any changes will be posted on our website and will become effective immediately upon posting. Your continued use of our services after such amendments constitutes your acceptance of the new Terms.<br />
            Thank you for choosing Lahiru Tours. We look forward to making your travel experience unforgettable.
          </p>
         
          <div style={{marginTop: '30px', textAlign: 'center'}}>
            <label style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
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
      </div>


      
    </div>
  );
}

export default BookingForm;