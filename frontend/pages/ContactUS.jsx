import React, { useState,useEffect } from 'react';

import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';
function ContactUS() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setsubject] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  


  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showAlert = () => {
    alert('Thank you for choosing Lahiru Tours! We are excited to assist you in planning your perfect Sri Lankan adventure. Our team will promptly get back to you within 24 hours with a customized itinerary tailored to your interests and needs.For any immediate questions or additional information, please feel free to contact us directly at info@lahirutours.co.uk.We look forward to making your travel dreams come true!Warm regards,The Lahiru Tours Team');
    
  };
  
  const handleChange = (e) => setPhone(e.target.value.replace(/[^0-9]/g, ''));

  const handleSubmit = async (event) => {
    event.preventDefault();
    

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
          setsubject('');
          setMessage('');
          
        } else {
          //alert('Failed to send email.');
        }
      } else {
       
      }
    } catch (error) {
      console.alert(error);
      alert('Error');
    }
    window.location.reload(); // Reload the page
  };
  
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
    padding: '1px 50px',
    borderRadius: '',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize:'2em',
  };

  const labelStyle = {
    display: 'block',
      fontSize: '16px',
      marginBottom: '5px',
      color: '#333',
  };
  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const headerStyle = {
    justifyContent: '',
    padding: '0px',
    backgroundColor:'#D3D3D3',
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
  }

  const logoImgStyle = {
    height: 'auto',
    width:'120px',
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
    gap:'20px',
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
    //height: '100vh',
    display: 'flex',
    top:isMobile?'200px':'',
    alignItems: 'center',
    marginBottom:isMobile?'200px':'100px',
    
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
    fontSize: '4em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
  };
  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    border: '2px solid #3498db',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
    fontFamily: 'Arial, sans-serif',
    position: 'center',
    zIndex: '999',
    minHeight:'80vh',
    marginTop:isMobile?'300px':'100px',
    marginBottom:isMobile?'auto':'100px',
    marginLeft:'',
    alignItems: 'center',
    backgroundSize: 'cover',
    
  };
  const wrapper={
    backgroundColor: '',
      border: '',
      borderRadius: '10px',
      width: '600px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
  }


  return (
    <div style={appStyle}>
      
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
  <div style={{ marginRight: '10px', marginTop: '19px', display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}> {/* Right-aligned content */}
      <Link to="/signin" style={{ 
          padding: '10px 20px', // Medium size padding
          fontSize: '16px', // Medium font size
          borderRadius: '25px', // Smooth rounded edges
          backgroundColor: '#4CAF50', 
          color: 'white', 
          textDecoration: 'none', 
          border: 'none', 
          cursor: 'pointer',
          minWidth: '100px', // Ensures consistent size
          textAlign: 'center' 
      }}>
          <b>Login</b>
      </Link>
      <Link to="/register" style={{ 
          padding: '10px 20px', // Medium size padding
          fontSize: '16px', // Medium font size
          borderRadius: '25px', // Smooth rounded edges
          backgroundColor: '#2196F3', 
          color: 'white', 
          textDecoration: 'none', 
          border: 'none', 
          cursor: 'pointer',
          minWidth: '100px', // Ensures consistent size
          textAlign: 'center' 
      }}>
          <b>Register</b>
      </Link>
  </div>
  
  
</div>
        
        
        
      </section>
      
      <div style={tourPackagesStyle}>
        <div style={wrapper}>
        <form style={formStyle}  onSubmit={handleSubmit}>
          <h2 style={h2Style}>Contact Us</h2>
          <label style={labelStyle} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
          <label style={labelStyle} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <label style={labelStyle} htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
            required
          />
          <label style={labelStyle} htmlFor="subject">Subject:</label>
          <textarea
            id="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            style={inputStyle}
            required
          ></textarea>
          <label style={labelStyle} htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
            required
          ></textarea>
          <button onClick={showAlert} type="submit" style={buttonStyle}>Inquiry</button>
        </form> 
      </div>
      </div>
      <a style={bookbuttonstyle2} href="/BookingForm"> <b>Book Now</b></a><br />
      
         
           
      
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
            </u>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ContactUS;
