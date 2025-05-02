import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Feedback = ({ backgroundImageUrl }) => {
  // Form state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Form errors state
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    subject: '',
    message: '',
    rating: ''
  });

  // UI state
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Validation functions
  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    // Allow only numbers, minimum 7 digits and maximum 15 digits
    const regex = /^\d{7,15}$/;
    return regex.test(phone);
  };

  const isNameValid = (name) => {
    // Allow letters, spaces, hyphens, and apostrophes, minimum 2 characters
    const regex = /^[a-zA-Z\s'-]{2,50}$/;
    return regex.test(name);
  };

  // Validate form on submit
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      subject: '',
      message: '',
      rating: ''
    };

    // First name validation
    if (!firstname.trim()) {
      newErrors.firstname = 'First name is required';
      formIsValid = false;
    } else if (!isNameValid(firstname)) {
      newErrors.firstname = 'Please enter a valid first name (2-50 characters)';
      formIsValid = false;
    }

    // Last name validation
    if (!lastname.trim()) {
      newErrors.lastname = 'Last name is required';
      formIsValid = false;
    } else if (!isNameValid(lastname)) {
      newErrors.lastname = 'Please enter a valid last name (2-50 characters)';
      formIsValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      formIsValid = false;
    }

    // Phone number validation (optional but validate if provided)
    if (phonenumber.trim() && !isValidPhone(phonenumber)) {
      newErrors.phonenumber = 'Please enter a valid phone number (7-15 digits)';
      formIsValid = false;
    }

    // Subject validation
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
      formIsValid = false;
    } else if (subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
      formIsValid = false;
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = 'Message is required';
      formIsValid = false;
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      formIsValid = false;
    }

    // Rating validation
    if (rating === 0) {
      newErrors.rating = 'Please provide a rating';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle input change with validation
  const handleInputChange = (e, setter, field, validator = null) => {
    const value = e.target.value;
    setter(value);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
    
    // Validate on blur or specific validators
    if (e.type === 'blur' && validator) {
      let errorMessage = '';
      
      if (!value.trim()) {
        errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (!validator(value)) {
        switch(field) {
          case 'firstname':
          case 'lastname':
            errorMessage = 'Please enter valid name (letters only)';
            break;
          case 'email':
            errorMessage = 'Please enter a valid email address';
            break;
          case 'phonenumber':
            errorMessage = 'Please enter a valid phone number (digits only)';
            break;
          default:
            errorMessage = 'Invalid input';
        }
      }
      
      setErrors({...errors, [field]: errorMessage});
    }
  };

  // Handle form submission
  const handleSaveFeedback = () => {
    // Run form validation before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      phonenumber,
      subject,
      message,
      rating,
    };

    setLoading(true);

    Axios.post('http://localhost:5555/feedback', data)
      .then(() => {
        setLoading(false);
        // Show success message
        toast.success('Feedback submitted successfully!');
        // Redirect after short delay
        setTimeout(() => {
          navigate('/Afterfeedback');
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('An error happened. Please try again later.');
        console.log(error);
      });
  };

  // Reset form
  const resetForm = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPhonenumber('');
    setSubject('');
    setMessage('');
    setRating(0);
    setErrors({
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      subject: '',
      message: '',
      rating: ''
    });
  };

  // Toggle navbar visibility
  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const styles = {
    app: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#e0f7fa',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    headerStyle: {
      padding: '0px',
      backgroundColor: '#D3D3D3',
      color: 'black',
      width: '100%',
      zIndex: '1000',
    },
    header1style: {
      justifyContent: 'center',
      padding: '0px',
      backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      color: '',
      width: '100%',
      transition: 'background-color 0.3s ease',
      marginTop: '0px',
    },
    logoImgStyle: {
      height: 'auto',
      width: '120px',
      marginTop: '0px',
    },
    h1: {
      fontSize: '4em',
      margin: '0',
      color: '#333',
      padding: '10px',
      borderRadius: '8px',
      display: 'inline-block',
      marginLeft: '-1600px',
    },
    para: {
      color: 'black',
      marginLeft: '-1600px',
    },
    loginButton: {
      marginLeft: '2000px',
      padding: '10px',
      marginTop: '-100px',
    },
    navbarStyle: {
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      padding: '10px 20px',
      transition: 'transform 0.3s ease',
      transform: isNavbarVisible ? 'translateY(0)' : 'translateY()',
      zIndex: '1000',
    },
    navbarStyle2: {
      fontSize: isMobile ? '15px' : 'auto',
      backgroundColor: 'white',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'auto',
      height: '120px',
      padding: '10px 0px 0px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      zIndex: '1000',
    },
    linkStyle: {
      color: 'black',
      textDecoration: 'none',
      margin: '0 10px',
      whiteSpace: 'nowrap',
    },
    navLinksStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '20px',
    },
    buttonContainerStyle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    container: {
      padding: isMobile ? '10px' : '30px',
      marginTop: isMobile ? '200px' : '0px',
      marginBottom: isMobile ? '100px' : '0px',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '2px solid #3498db',
      borderRadius: '10px',
      width: '600px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
    },
    formLabel: {
      display: 'block',
      fontSize: '16px',
      marginBottom: '5px',
      color: '#333',
    },
    formInput: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    errorInput: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #e74c3c',
      borderRadius: '5px',
      fontSize: '16px',
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '14px',
      marginTop: '5px',
      textAlign: 'left',
    },
    formTextarea: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      height: '100px',
      resize: 'none',
    },
    errorTextarea: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #e74c3c',
      borderRadius: '5px',
      fontSize: '16px',
      height: '100px',
      resize: 'none',
    },
    ratingContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    ratingStar: {
      fontSize: '70px',
      cursor: 'pointer',
      color: '#ccc',
    },
    rated: {
      color: '#f39c12',
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    formButton: {
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      border: 'none',
    },
    saveButton: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    resetButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      marginRight: '10px',
    },
    footer: {
      padding: '20px',
      backgroundColor: '#4682B4',
      color: 'white',
      textAlign: 'left',
      marginTop: 'auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      position: 'relative',
    },
    footerStyle: {
      padding: '20px',
      backgroundColor: '#4682B4',
      color: 'white',
      textAlign: 'left',
      marginTop: '0%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    footerSectionStyle: {
      marginBottom: '20px',
      flex: '1 1 200px',
    },
    footerSectionTitleStyle: {
      borderBottom: '1px solid white',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
    footerListStyle: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    footerListItemStyle: {
      marginBottom: '10px',
    },
    socialMediaStyle: {
      display: 'flex',
      gap: '10px',
    },
    socialLinkStyle: {
      color: 'white',
      textDecoration: 'none',
    },
    bookbuttonstyle: {
      display: isMobile ? 'none' : 'block',
      backgroundColor: '#90EE90',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '30px',
      marginTop: '0px',
      textAlign: 'center',
      minWidth: '20px',
    },
    bookbuttonstyle3: {
      display: isMobile ? 'none' : 'block',
      padding: '10px 20px',
      fontSize: '30px',
      borderRadius: '25px',
      backgroundColor: '#2196F3',
      color: 'white',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      minWidth: '20px',
      textAlign: 'center'
    },
    requiredLabel: {
      color: '#e74c3c',
      marginLeft: '3px',
    }
  };

  return (
    <div style={styles.app}>
      <section style={styles.headerStyle}>
        <div style={styles.navbarStyle2}>
          {/* Left Section: Logo */}
          <div>
            <img src="./images/logo.jpeg" alt="Logo" style={styles.logoImgStyle} />
          </div>

          {/* Center Section: Navigation Links */}
          <div style={styles.navLinksStyle}>
            <a href="/" style={styles.linkStyle}>Home</a>
            <a href="/About" style={styles.linkStyle}>About Us</a>
            <a href="/TourPackages" style={styles.linkStyle}>Tour Packages</a>
            <a href="/ContactUS" style={styles.linkStyle}>Contact</a>
            <a href="/feedback" style={styles.linkStyle}><b>Feedback</b></a>
          </div>
          <div style={{ marginRight: '10px', marginTop: '19px', display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Link to="/signin" style={styles.bookbuttonstyle}>
              <b>Login</b>
            </Link>
            <Link to="/register" style={styles.bookbuttonstyle3}>
              <b>Register</b>
            </Link>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <div style={styles.wrapper}>
          <h1 style={styles.title}>Create Feedback</h1>

          <div>
            {/* First Name field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                First Name <span style={styles.requiredLabel}>*</span>
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => handleInputChange(
                  e, 
                  setFirstname, 
                  'firstname', 
                  isNameValid
                )}
                onBlur={(e) => handleInputChange(
                  e, 
                  setFirstname, 
                  'firstname', 
                  isNameValid
                )}
                style={errors.firstname ? styles.errorInput : styles.formInput}
                placeholder="Enter your first name"
              />
              {errors.firstname && <div style={styles.errorMessage}>{errors.firstname}</div>}
            </div>

            {/* Last Name field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Last Name <span style={styles.requiredLabel}>*</span>
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => handleInputChange(
                  e, 
                  setLastname, 
                  'lastname',
                  isNameValid
                )}
                onBlur={(e) => handleInputChange(
                  e, 
                  setLastname, 
                  'lastname', 
                  isNameValid
                )}
                style={errors.lastname ? styles.errorInput : styles.formInput}
                placeholder="Enter your last name"
              />
              {errors.lastname && <div style={styles.errorMessage}>{errors.lastname}</div>}
            </div>

            {/* Email field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Email <span style={styles.requiredLabel}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(
                  e, 
                  setEmail, 
                  'email', 
                  isValidEmail
                )}
                onBlur={(e) => handleInputChange(
                  e, 
                  setEmail, 
                  'email', 
                  isValidEmail
                )}
                style={errors.email ? styles.errorInput : styles.formInput}
                placeholder="Enter your email address"
              />
              {errors.email && <div style={styles.errorMessage}>{errors.email}</div>}
            </div>

            {/* Phone Number field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                value={phonenumber}
                onChange={(e) => {
                  // Only accept numeric input
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setPhonenumber(value);
                  if (errors.phonenumber) {
                    setErrors({...errors, phonenumber: ''});
                  }
                }}
                onBlur={(e) => {
                  if (phonenumber && !isValidPhone(phonenumber)) {
                    setErrors({...errors, phonenumber: 'Please enter a valid phone number (7-15 digits)'});
                  }
                }}
                style={errors.phonenumber ? styles.errorInput : styles.formInput}
                placeholder="Enter your phone number (optional)"
              />
              {errors.phonenumber && <div style={styles.errorMessage}>{errors.phonenumber}</div>}
            </div>

            {/* Subject field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Subject <span style={styles.requiredLabel}>*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) {
                    setErrors({...errors, subject: ''});
                  }
                }}
                onBlur={() => {
                  if (!subject.trim()) {
                    setErrors({...errors, subject: 'Subject is required'});
                  } else if (subject.trim().length < 3) {
                    setErrors({...errors, subject: 'Subject must be at least 3 characters'});
                  }
                }}
                style={errors.subject ? styles.errorInput : styles.formInput}
                placeholder="Enter subject"
              />
              {errors.subject && <div style={styles.errorMessage}>{errors.subject}</div>}
            </div>

            {/* Message field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Message <span style={styles.requiredLabel}>*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors({...errors, message: ''});
                  }
                }}
                onBlur={() => {
                  if (!message.trim()) {
                    setErrors({...errors, message: 'Message is required'});
                  } else if (message.trim().length < 10) {
                    setErrors({...errors, message: 'Message must be at least 10 characters'});
                  }
                }}
                style={errors.message ? styles.errorTextarea : styles.formTextarea}
                placeholder="Enter your message"
              />
              {errors.message && <div style={styles.errorMessage}>{errors.message}</div>}
            </div>

            {/* Rating field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Rating <span style={styles.requiredLabel}>*</span>
              </label>
              <div style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRating(i + 1);
                      setErrors({...errors, rating: ''});
                    }}
                    style={{ ...styles.ratingStar, ...(rating > i && styles.rated) }}
                    aria-label={`Rate ${i + 1} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {errors.rating && <div style={styles.errorMessage}>{errors.rating}</div>}
            </div>

            <div style={styles.formActions}>
              <div>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ ...styles.formButton, ...styles.resetButton }}
                >
                  Reset
                </button>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleSaveFeedback}
                  style={{ ...styles.formButton, ...styles.saveButton }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
                <Link to="/" style={{ ...styles.formButton, ...styles.cancelButton }}>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>

      <footer style={styles.footerStyle}>
        <div style={styles.footerSectionStyle}>
          <h4 style={styles.footerSectionTitleStyle}>Relaxing</h4>
          <ul style={styles.footerListStyle}>
            <li style={styles.footerListItemStyle}>Hikkaduwa Beach</li>
            <li style={styles.footerListItemStyle}>Galle fort</li>
            <li style={styles.footerListItemStyle}>Negambo Beach</li>
            <li style={styles.footerListItemStyle}>Peradeniya Botnical</li>
            <li style={styles.footerListItemStyle}>Tangalla</li>
          </ul>
        </div>
        <div style={styles.footerSectionStyle}>
          <h4 style={styles.footerSectionTitleStyle}>Ancient Places</h4>
          <ul style={styles.footerListStyle}>
            <li style={styles.footerListItemStyle}>Sigiriya</li>
            <li style={styles.footerListItemStyle}>Anuradhapura</li>
            <li style={styles.footerListItemStyle}>Polonnaruwa</li>
          </ul>
        </div>
        <div style={styles.footerSectionStyle}>
          <h4 style={styles.footerSectionTitleStyle}>Become Our Friend</h4>
          <ul style={styles.footerListStyle}>
            <li style={styles.footerListItemStyle}><a href="https://www.facebook.com/share/TLHsJswwmcxzvuiA/?mibextid=WC7FNe" style={styles.socialLinkStyle}>Facebook</a></li>
            <li style={styles.footerListItemStyle}><a href="https://www.instagram.com/lahiru_tours_sri_lanka?igsh=azYyenZxaHZ6aW1y&utm_source=qr" style={styles.socialLinkStyle}>Instagram</a></li>
          </ul>
        </div>
        <div style={styles.footerSectionStyle}>
          <h4 style={styles.footerSectionTitleStyle}>Contact Us</h4>
          <p><u>
            info@travelsrilanka.co.uk<br />
            admin@travelsrilanka.co.uk <br />
            payments@travelsrilanka.co.uk <br />
          </u>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Feedback;