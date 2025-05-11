import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Feedback = () => {
  // Form state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Form validation states
  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phonenumber: false,
    subject: false,
    message: false,
    rating: false
  });
  
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const navigate = useNavigate();

  // Animation style for error feedback
  const animationStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
    }
  `;

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

  const isValidPhone = (number) => {
    const phoneRegex = /^\d{7,15}$/; // Regex to check for 7 to 15 digits
    return phoneRegex.test(number);
  };
  const validatePhone = (value) => {
  if (!value.trim()) return '';
  if (value.length !== 10) return 'Please enter a valid phone number (10 digits)';
  if (value[0] !== '0') return 'Please enter a valid phone number starting with 0';
  return '';
};


  const isNameValid = (name) => {
    // Allow letters, spaces, hyphens, and apostrophes, minimum 2 characters
    const regex = /^[a-zA-Z\s'-]{2,50}$/;
    return regex.test(name);
  };

  // Individual field validators
  const validateFirstname = (value) => {
    if (!value.trim()) return 'First name is required';
    if (!isNameValid(value)) return 'Please enter a valid first name (2-50 characters)';
    return '';
  };

  const validateLastname = (value) => {
    if (!value.trim()) return 'Last name is required';
    if (!isNameValid(value)) return 'Please enter a valid last name (2-50 characters)';
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required';
    if (!isValidEmail(value)) return 'Please enter a valid email address';
    return '';
  };

  

  const validateSubject = (value) => {
    if (!value.trim()) return 'Subject is required';
    if (value.trim().length < 3) return 'Subject must be at least 3 characters';
    return '';
  };

  const validateMessage = (value) => {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
    return '';
  };

  const validateRating = (value) => {
    if (value === 0) return 'Please provide a rating';
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const firstnameError = validateFirstname(firstname);
    const lastnameError = validateLastname(lastname);
    const emailError = validateEmail(email);
    const phonenumberError = validatePhone(phonenumber);
    const subjectError = validateSubject(subject);
    const messageError = validateMessage(message);
    const ratingError = validateRating(rating);

    setErrors({
      firstname: firstnameError,
      lastname: lastnameError,
      email: emailError,
      phonenumber: phonenumberError,
      subject: subjectError,
      message: messageError,
      rating: ratingError
    });

    return !(firstnameError || lastnameError || emailError || phonenumberError || subjectError || messageError || ratingError);
  };

  // Handle blur event (when user moves away from input)
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });

    // Validate the specific field
    switch (field) {
      case 'firstname':
        setErrors({ ...errors, firstname: validateFirstname(firstname) });
        break;
      case 'lastname':
        setErrors({ ...errors, lastname: validateLastname(lastname) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(email) });
        break;
      case 'phonenumber':
        setErrors({ ...errors, phonenumber: validatePhone(phonenumber) });
        break;
      case 'subject':
        setErrors({ ...errors, subject: validateSubject(subject) });
        break;
      case 'message':
        setErrors({ ...errors, message: validateMessage(message) });
        break;
      case 'rating':
        setErrors({ ...errors, rating: validateRating(rating) });
        break;
      default:
        break;
    }
  };

  // Handle form field changes
  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
    if (touched.firstname) {
      setErrors({ ...errors, firstname: validateFirstname(e.target.value) });
    }
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    if (touched.lastname) {
      setErrors({ ...errors, lastname: validateLastname(e.target.value) });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(e.target.value) });
    }
  };

  const handlePhonenumberChange = (e) => {
    // Only accept numeric input
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhonenumber(value);
    if (touched.phonenumber) {
      setErrors({ ...errors, phonenumber: validatePhone(value) });
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    if (touched.subject) {
      setErrors({ ...errors, subject: validateSubject(e.target.value) });
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (touched.message) {
      setErrors({ ...errors, message: validateMessage(e.target.value) });
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setTouched({...touched, rating: true});
    setErrors({...errors, rating: validateRating(newRating)});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      firstname: true,
      lastname: true,
      email: true,
      phonenumber: true,
      subject: true,
      message: true,
      rating: true
    });
    
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
    setTouched({
      firstname: false,
      lastname: false,
      email: false,
      phonenumber: false,
      subject: false,
      message: false,
      rating: false
    });
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

  // Styling - following the ContactUS component pattern
  const styles = {
    app: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflow: 'hidden',
    },
    headerStyle: {
      padding: '0px',
      backgroundColor: '#D3D3D3',
      color: 'black',
      width: '100%',
      zIndex: '1000',
    },
    logoImgStyle: {
      height: 'auto',
      width: '120px',
      marginTop: '0px',
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
    container: {
      padding: '20px',
      backgroundColor: '#e0f7fa',
      justifyContent: 'center',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      minHeight: '60vh',
      marginBottom: isMobile ? '200px' : '100px',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      border: '2px solid #3a86ff',
      borderRadius: '10px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif',
      position: 'center',
      zIndex: '999',
      minHeight: '80vh',
      marginTop: isMobile ? '300px' : '100px',
      marginBottom: isMobile ? 'auto' : '100px',
      width: '600px',
      transition: 'all 0.3s ease',
    },
    title: {
      fontSize: '2.5em',
      margin: '0 0 30px 0',
      color: '#333',
      padding: '10px',
      borderRadius: '8px',
      display: 'inline-block',
      borderBottom: '3px solid #3a86ff',
    },
    fieldContainer: {
      marginBottom: '15px',
      position: 'relative',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      marginBottom: '5px',
      color: '#333',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    inputStyle: (fieldName) => ({
      width: 'calc(100% - 20px)',
      padding: '12px',
      border: touched[fieldName] && errors[fieldName] ? '1px solidrgb(223, 89, 74)' : '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      transition: 'border 0.3s ease, box-shadow 0.3s ease',
      boxShadow: touched[fieldName] && errors[fieldName] ? '0 0 5px rgba(227, 60, 42, 0.5)' : 'none',
    }),
    textarea: {
      width: 'calc(100% - 20px)',
      padding: '12px',
      marginBottom: '25px',
      borderRadius: '5px',
      fontSize: '16px',
      minHeight: '150px',
      resize: 'none',
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '14px',
      marginTop: '5px',
      marginBottom: '10px',
      textAlign: 'left',
      fontWeight: 'normal',
      animation: 'fadeIn 0.3s',
    },
    ratingContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
      gap: '5px',
    },
    ratingStar: (index) => ({
      fontSize: '32px',
      cursor: 'pointer',
      color: rating >= index ? '#f39c12' : '#ccc',
      transition: 'color 0.3s, transform 0.2s',
      padding: '5px',
      '&:hover': {
        transform: 'scale(1.2)',
      }
    }),
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    button: {
      padding: '12px 25px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      border: 'none',
      fontWeight: 'bold',
      transition: 'background-color 0.3s, transform 0.2s',
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      '&:hover': {
        backgroundColor: '#2980b9',
        transform: 'translateY(-2px)',
      }
    },
    resetButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      '&:hover': {
        backgroundColor: '#7f8c8d',
      }
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#c0392b',
      }
    },
    requiredLabel: {
      color: '#e74c3c',
      marginLeft: '3px',
    },
    loginButton: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '25px',
      backgroundColor: '#4CAF50',
      color: 'white',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      minWidth: '100px',
      textAlign: 'center'
    },
    registerButton: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '25px',
      backgroundColor: '#2196F3',
      color: 'white',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      minWidth: '100px',
      textAlign: 'center'
    },
    footerStyle: {
      padding: '20px',
      backgroundColor: '#4682B4',
      color: 'white',
      textAlign: 'left',
      marginTop: 'auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      position: 'relative',
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
    socialLinkStyle: {
      color: 'white',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.app}>
      <style>{animationStyle}</style>
      
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
            <Link to="/signin" style={styles.loginButton}>
              <b>Login</b>
            </Link>
            <Link to="/register" style={styles.registerButton}>
              <b>Register</b>
            </Link>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <form style={styles.formContainer} onSubmit={handleSubmit} noValidate>
          <h2 style={styles.title}>Create Feedback</h2>

          {/* First Name field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="firstname">
              First Name <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={handleFirstnameChange}
              onBlur={() => handleBlur('firstname')}
              style={styles.inputStyle('firstname')}
              placeholder="Enter your first name"
              className={touched.firstname && errors.firstname ? 'shake' : ''}
              required
            />
            {touched.firstname && errors.firstname && (
              <div style={styles.errorMessage}>{errors.firstname}</div>
            )}
          </div>

          {/* Last Name field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="lastname">
              Last Name <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={handleLastnameChange}
              onBlur={() => handleBlur('lastname')}
              style={styles.inputStyle('lastname')}
              placeholder="Enter your last name"
              className={touched.lastname && errors.lastname ? 'shake' : ''}
              required
            />
            {touched.lastname && errors.lastname && (
              <div style={styles.errorMessage}>{errors.lastname}</div>
            )}
          </div>

          {/* Email field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="email">
              Email <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
              style={styles.inputStyle('email')}
              placeholder="Enter your email address"
              className={touched.email && errors.email ? 'shake' : ''}
              required
            />
            {touched.email && errors.email && (
              <div style={styles.errorMessage}>{errors.email}</div>
            )}
          </div>

          {/* Phone Number field */}
          <div style={styles.fieldContainer}>
  <label style={styles.label} htmlFor="phonenumber">
    Phone Number
  </label>
  <input
    type="tel"
    id="phonenumber"
    value={phonenumber}
    onChange={(e) => {
      // Only accept numeric input
      const value = e.target.value.replace(/[^0-9]/g, '');
      // Validate phone number length
      if (value.length > 10) {
        return;
      }
      if (value.length === 10 && value[0] !== '0') {
        return;
      }
      setPhonenumber(value);
      if (touched.phonenumber) {
        setErrors({ ...errors, phonenumber: validatePhone(value) });
      }
    }}
    onBlur={() => handleBlur('phonenumber')}
    style={styles.inputStyle('phonenumber')}
    placeholder="Enter your phone number (optional)"
    className={touched.phonenumber && errors.phonenumber ? 'shake' : ''}
  />
  {touched.phonenumber && errors.phonenumber && (
    <div style={styles.errorMessage}>{errors.phonenumber}</div>
  )}
</div>

          {/* Subject field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="subject">
              Subject <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              onBlur={() => handleBlur('subject')}
              style={styles.inputStyle('subject')}
              placeholder="Enter subject"
              className={touched.subject && errors.subject ? 'shake' : ''}
              required
            />
            {touched.subject && errors.subject && (
              <div style={styles.errorMessage}>{errors.subject}</div>
            )}
          </div>

          {/* Message field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="message">
              Message <span style={styles.requiredLabel}>*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              onBlur={() => handleBlur('message')}
              style={{
                ...styles.textarea,
                border: touched.message && errors.message ? '1px solid #e74c3c' : '1px solid #ccc',
                boxShadow: touched.message && errors.message ? '0 0 5px rgba(231, 76, 60, 0.5)' : 'none',
              }}
              placeholder="Enter your message"
              className={touched.message && errors.message ? 'shake' : ''}
              required
            ></textarea>
            {touched.message && errors.message && (
              <div style={styles.errorMessage}>{errors.message}</div>
            )}
          </div>

          {/* Rating field */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>
              Rating <span style={styles.requiredLabel}>*</span>
            </label>
            <div style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRatingChange(index)}
                  style={{
                    fontSize: '60px',
                    cursor: 'pointer',
                    color: rating >= index ? '#f39c12' : '#ccc',
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    transition: 'color 0.3s, transform 0.2s',
                  }}
                  aria-label={`Rate ${index} stars`}
                  className={touched.rating && errors.rating ? 'shake' : ''}
                >
                  ★
                </button>
              ))}
            </div>
            {touched.rating && errors.rating && (
              <div style={styles.errorMessage}>{errors.rating}</div>
            )}
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={resetForm}
              style={{...styles.button, backgroundColor: '#95a5a6'}}
            >
              Reset
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{...styles.button, backgroundColor: '#3a86ff'}}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <Link to="/" style={{
                ...styles.button, 
                backgroundColor: '#e74c3c',
                textDecoration: 'none',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}>
                Cancel
              </Link>
            </div>
          </div>
        </form>
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