import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar,faEnvelope,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';

const isValidEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};



const Feedback = ({ backgroundImageUrl }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSaveFeedback = () => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

   

    if (rating === 0) {
      toast.error('Please provide a rating.');
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
        navigate('/Afterfeedback');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('An error happened. Please check the console.');
        console.log(error);
      });
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
    headerStyle : {
      justifyContent: '',
      padding: '0px',
      backgroundColor:'#D3D3D3',
      color: 'black',
      position: '',
      width: '100%',
      top: '',
      left: '0',
      zIndex: '1000',
    },
    header1style : {
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
    },
    logoImgStyle: {
      height: 'auto',
    width:'120px',
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
    navbarStyle : {
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
    },
    navbarStyle2 : {
      fontSize:isMobile?'15px':'auto',
      backgroundColor: 'white',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'auto',
      height: '120px',
      padding: '10px 0px 0px  ',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      zIndex: '1000',
    },
    
    linkStyle : {
      color: 'black',
  textDecoration: 'none',
  margin: '0 10px',
  whiteSpace: 'nowrap', // Ensures single-line display
    },
    
    navLinksStyle : {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap:'20px',
    },
    buttonContainerStyle : {
      display: 'flex',
      alignItems: 'center',
      gap: '10px', // Adds space between buttons
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    li: {
      marginBottom: '20px',
    },
    a: {
      display: 'block',
      color: 'white',
      padding: '14px 16px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    container: {
      padding:isMobile? '10px':'30px',
     marginTop:isMobile?'200px':'0px',
     marginBottom:isMobile?'100px':'0px',
      backgroundSize: 'cover',
      //height: '100vh',
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
    formTextarea: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #ccc',
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
    footerSection: {
      marginBottom: '20px',
      flex: '1 1 200px',
    },
    footerSectionTitle: {
      borderBottom: '1px solid white',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
    footerList: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    footerListItem: {
      marginBottom: '10px',
    },
    socialLink: {
      color: 'white',
      textDecoration: 'none',
    },
    footerStyle : {
      padding: '20px',
      backgroundColor: '#4682B4',
      color: 'white',
      textAlign: 'left',
      marginTop: '0%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      
    },
  
    footerSectionStyle : {
      marginBottom: '20px',
      flex: '1 1 200px',
    },
  
    footerSectionTitleStyle : {
      borderBottom: '1px solid white',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
  
    footerListStyle : {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
  
    footerListItemStyle : {
      marginBottom: '10px',
    },
  
    socialMediaStyle : {
      display: 'flex',
      gap: '10px',
    },
  
    socialLinkStyle : {
      color: 'white',
      textDecoration: 'none',
    },
    bookbuttonstyle: {
      display: isMobile ? 'none' : 'block', // Hide on mobile
      backgroundColor: '#90EE90',
      color: 'white',
      padding: '10px 20px', // Medium size padding
      border: 'none',
      borderRadius: '25px', // Smooth curved edges
      cursor: 'pointer',
      fontSize: '30px', // Medium font size
      marginTop: '0px',
      textAlign: 'center',
      minWidth: '20px', // Consistent button size
  },
  
    bookbuttonstyle3:{
      display: isMobile ? 'none' : 'block', // Hide on mobile
      backgroundColor: '#4682B4',
        color: 'white',
        padding: '10px 20px', // Medium size padding
        fontSize: '30px', // Medium font size
        borderRadius: '25px', // Smooth rounded edges
        backgroundColor: '#2196F3', 
        color: 'white', 
        textDecoration: 'none', 
        border: 'none', 
        cursor: 'pointer',
        minWidth: '20px', // Ensures consistent size
        textAlign: 'center'
    },
    
  };


  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
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
  <div style={{ marginRight: '10px', marginTop: '19px', display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}> {/* Right-aligned content */}
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
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value.replace(/[^0-9]/g, ''))}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.formTextarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Rating</label>
              <div style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    style={{ ...styles.ratingStar, ...(rating > i && styles.rated) }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.formActions}>
              <button
                onClick={handleSaveFeedback}
                style={{ ...styles.formButton, ...styles.saveButton }}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Feedback'}
              </button>
              <Link to="/" style={{ ...styles.formButton, ...styles.cancelButton }}>
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
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
