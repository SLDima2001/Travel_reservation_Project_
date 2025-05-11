import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function ContactUS() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Form validation states
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  });
  
  // Error states
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (value) => {
  if (!value.trim()) return '';
  if (value.length !== 10) return 'Please enter a valid phone number (10 digits)';
  if (value[0] !== '0') return 'Please enter a valid phone number starting with 0';
  return '';
};

  const validateSubject = (value) => {
    if (!value.trim()) return 'Subject is required';
    if (value.trim().length < 5) return 'Subject must be at least 5 characters';
    return '';
  };

  const validateMessage = (value) => {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 20) return 'Message must be at least 20 characters';
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const subjectError = validateSubject(subject);
    const messageError = validateMessage(message);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      subject: subjectError,
      message: messageError
    });

    return !(nameError || emailError || phoneError || subjectError || messageError);
  };

  // Handle blur event (when user moves away from input)
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });

    // Validate the specific field
    switch (field) {
      case 'name':
        setErrors({ ...errors, name: validateName(name) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(email) });
        break;
      case 'phone':
        setErrors({ ...errors, phone: validatePhone(phone) });
        break;
      case 'subject':
        setErrors({ ...errors, subject: validateSubject(subject) });
        break;
      case 'message':
        setErrors({ ...errors, message: validateMessage(message) });
        break;
      default:
        break;
    }
  };

  // Handle form input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (touched.name) {
      setErrors({ ...errors, name: validateName(e.target.value) });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(e.target.value) });
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    if (touched.phone) {
      setErrors({ ...errors, phone: validatePhone(value) });
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

  const showAlert = () => {
    alert('Thank you for choosing Lahiru Tours! We are excited to assist you in planning your perfect Sri Lankan adventure. Our team will promptly get back to you within 24 hours with a customized itinerary tailored to your interests and needs. For any immediate questions or additional information, please feel free to contact us directly at info@lahirutours.co.uk. We look forward to making your travel dreams come true! Warm regards, The Lahiru Tours Team');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate all fields before submission
    const isValid = validateForm();

    if (!isValid) {
      // Mark all fields as touched to show all errors
      setTouched({
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5555/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error sending email: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();

        if (responseData.success) {
          setName('');
          setEmail('');
          setPhone('');
          setSubject('');
          setMessage('');
          
          // Reset touched and errors states
          setTouched({
            name: false,
            email: false,
            phone: false,
            subject: false,
            message: false
          });
          
          setErrors({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          
          showAlert();
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while sending your message.');
    }
  };
  
  // Styling
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
  };
  
  const textareaStyle = {
    width: '100%',
    padding: '20px',
    marginBottom: '25px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: '300px',
  };
  
  const bookbuttonstyle = {
    display: isMobile ? 'none' : 'block', // Hide on mobile
    backgroundColor: '#90EE90',
    color: 'white',
    padding: '20px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.6em',
    marginTop: '0px',
  };
  
  const bookbuttonstyle3 = {
    display: isMobile ? 'none' : 'block', // Hide on mobile
    backgroundColor: '#4682B4',
    color: 'white',
    padding: '20px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.6em',
    marginTop: '0px',
  };
  
  const bookbuttonstyle2 = {
    display: isMobile ? 'inline-block' : 'none', // Hide on pc
    backgroundColor: '#4682B4',
    color: 'white',
    padding: '20px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.6em',
    marginTop: '100px',
    width:'100%',
  };
  
  const buttonStyle = {
    backgroundColor: '#4682B4',
    color: 'white',
    border: 'none',
    padding: '15px 50px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize:'1.5em',
    marginTop: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    hover: {
      backgroundColor: '#366B96'
    }
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px',
    marginBottom: '5px',
    color: '#333',
    textAlign: 'left',
    fontWeight: 'bold',
  };
  
  const inputStyle = (fieldName) => ({
    width: 'calc(100% - 20px)',
    padding: '12px',
    border: touched[fieldName] && errors[fieldName] ? '1px solid #e74c3c' : '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    boxShadow: touched[fieldName] && errors[fieldName] ? '0 0 5px rgba(231, 76, 60, 0.5)' : 'none',
  });

  const errorStyle = {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '5px',
    marginBottom: '10px',
    textAlign: 'left',
    fontWeight: 'normal',
    animation: 'fadeIn 0.3s',
  };

  const fieldContainerStyle = {
    marginBottom: '15px',
    position: 'relative',
  };

  const headerStyle = {
    justifyContent: '',
    padding: '0px',
    backgroundColor: '#D3D3D3',
    color: 'black',
    position: '',
    width: '100%',
    top: '',
    left: '0',
    zIndex: '1000',
  };
  
  const header1style = {
    justifyContent: 'center',
    padding: '0px',
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    color: '',
    position: '',
    width: '100%',
    top: '',
    left: '0',
    transition: 'background-color 0.3s ease',
    zIndex: '',
    marginTop: '0px',
  };

  const logoImgStyle = {
    height: 'auto',
    width: '120px',
    marginTop: '0px',
  };

  const h1Style = {
    fontSize: '3em',
    margin: '0',
    padding: '10px',
    backgroundColor: '#fff', // White background for contrast
    borderRadius: '8px',
    display: 'inline-block',
  };

  const navbarStyle = {
    backgroundColor: '',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: '',
    top: '0',
    left: '0',
    width: '100%',
    height: '70px',
    padding: '10px 20px',
    transition: 'transform 0.3s ease',
    transform: isNavbarVisible ? 'translateY(0)' : 'translateY()',
    zIndex: '1000',
  };
  
  const navbarStyle2 = {
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
  };
  
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    margin: '0 10px',
    whiteSpace: 'nowrap', // Ensures single-line display
  };
  
  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Adds space between buttons
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  const liStyle = {
    marginBottom: '20px',
  };

  const aStyle = {
    display: 'block',
    color: 'white',
    padding: '14px 16px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const tourPackagesStyle = {
    padding: '20px',
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    top: isMobile ? '200px' : '',
    alignItems: 'center',
    marginBottom: isMobile ? '200px' : '100px',
  };

  const packageStyle = {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '20%',
    boxShadow: '0 4px 8px rgba(10, 0, 0, 0.1)',
  };

  const packageImgStyle = {
    height: '150px',
    borderRadius: '50%',
  };

  const footerStyle = {
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
  };

  const footerSectionStyle = {
    marginBottom: '20px',
    flex: '1 1 200px',
  };

  const footerSectionTitleStyle = {
    borderBottom: '1px solid white',
    paddingBottom: '10px',
    marginBottom: '10px',
  };

  const footerListStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };
  
  const footerListItemStyle = {
    marginBottom: '10px',
  };

  const socialLinkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };
  
  const h2Style = {
    fontSize: '2.5em',
    margin: '0 0 30px 0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
    borderBottom: '3px solid #4682B4',
  };
  
  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    border: '2px solid #3498db',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    position: 'center',
    zIndex: '999',
    minHeight: '80vh',
    marginTop: isMobile ? '300px' : '100px',
    marginBottom: isMobile ? 'auto' : '100px',
    marginLeft: '',
    alignItems: 'center',
    backgroundSize: 'cover',
    transition: 'all 0.3s ease',
  };
  
  const wrapper = {
    backgroundColor: '',
    border: '',
    borderRadius: '10px',
    width: '600px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
  };

  // Add CSS for animation
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

  return (
    <div style={appStyle}>
      <style>{animationStyle}</style>
      
      <section style={headerStyle}>
        <div style={navbarStyle2}>
          {/* Left Section: Logo */}
          <div>
            <img src="./images/logo.jpeg" alt="Logo" style={logoImgStyle} />
          </div>
          
          {/* Center Section: Navigation Links */}
          <div style={navLinksStyle}>
            <a href="/" style={linkStyle}>Home</a>
            <a href="/About" style={linkStyle}>About Us</a>
            <a href="/TourPackages" style={linkStyle}>Tour Packages</a>
            <a href="/ContactUS" style={linkStyle}><b>Contact</b></a>
            <a href="/feedback" style={linkStyle}>Feedback</a>
          </div>
          
          <div style={{ marginRight: '10px', marginTop: '19px', display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Link to="/signin" style={{ 
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
            }}>
                <b>Login</b>
            </Link>
            <Link to="/register" style={{ 
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
            }}>
                <b>Register</b>
            </Link>
          </div>
        </div>
      </section>
      
      <div style={tourPackagesStyle}>
        <div style={wrapper}>
          <form style={formStyle} onSubmit={handleSubmit} noValidate>
            <h2 style={h2Style}>Contact Us</h2>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                onBlur={() => handleBlur('name')}
                style={inputStyle('name')}
                required
                className={touched.name && errors.name ? 'shake' : ''}
              />
              {touched.name && errors.name && (
                <div style={errorStyle}>{errors.name}</div>
              )}
            </div>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                style={inputStyle('email')}
                required
                className={touched.email && errors.email ? 'shake' : ''}
              />
              {touched.email && errors.email && (
                <div style={errorStyle}>{errors.email}</div>
              )}
            </div>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur('phone')}
                style={inputStyle('phone')}
                required
                className={touched.phone && errors.phone ? 'shake' : ''}
              />
              {touched.phone && errors.phone && (
                <div style={errorStyle}>{errors.phone}</div>
              )}
            </div>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="subject">Subject:</label>
              <input
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
                onBlur={() => handleBlur('subject')}
                style={inputStyle('subject')}
                required
                className={touched.subject && errors.subject ? 'shake' : ''}
              />
              {touched.subject && errors.subject && (
                <div style={errorStyle}>{errors.subject}</div>
              )}
            </div>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                onBlur={() => handleBlur('message')}
                style={{
                  ...textareaStyle,
                  border: touched.message && errors.message ? '1px solid #e74c3c' : '1px solid #ccc',
                  boxShadow: touched.message && errors.message ? '0 0 5px rgba(231, 76, 60, 0.5)' : 'none',
                }}
                required
                className={touched.message && errors.message ? 'shake' : ''}
              ></textarea>
              {touched.message && errors.message && (
                <div style={errorStyle}>{errors.message}</div>
              )}
            </div>
            
            <button type="submit" style={buttonStyle}>Send Inquiry</button>
          </form> 
        </div>
      </div>
      
      <a style={bookbuttonstyle2} href="/BookingForm"><b>Book Now</b></a><br />
      
      <footer style={footerStyle}>
        <div style={footerSectionStyle}>
          <h4 style={footerSectionTitleStyle}>Relaxing</h4>
          <ul style={footerListStyle}>
            <li style={footerListItemStyle}>Hikkaduwa Beach</li>
            <li style={footerListItemStyle}>Galle fort</li>
            <li style={footerListItemStyle}>Negambo Beach</li>
            <li style={footerListItemStyle}>Peradeniya Botnical</li>
            <li style={footerListItemStyle}>Tangalla</li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerSectionTitleStyle}>Ancient Places</h4>
          <ul style={footerListStyle}>
            <li style={footerListItemStyle}>Sigiriya</li>
            <li style={footerListItemStyle}>Anuradhapura</li>
            <li style={footerListItemStyle}>Polonnaruwa</li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerSectionTitleStyle}>Become Our Friend</h4>
          <ul style={footerListStyle}>
            <li style={footerListItemStyle}><a href="https://www.facebook.com/share/TLHsJswwmcxzvuiA/?mibextid=WC7FNe" style={socialLinkStyle}>Facebook</a></li>
            <li style={footerListItemStyle}><a href="https://www.instagram.com/lahiru_tours_sri_lanka?igsh=azYyenZxaHZ6aW1y&utm_source=qr" style={socialLinkStyle}>Instagram</a></li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerSectionTitleStyle}>Contact Us</h4>
          <p><u>
            info@travelsrilanka.co.uk<br />
            admin@travelsrilanka.co.uk <br />
            payments@travelsrilanka.co.uk <br />
          </u></p>
        </div>
      </footer>
    </div>
  );
}

export default ContactUS;