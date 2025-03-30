import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar,faEnvelope,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';


function Afterfeedback() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
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

  

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    
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
    display: isMobile ? 'block' : 'none', // Hide on mobile
    backgroundColor: '#4682B4',
      color: 'white',
      padding: '20px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.6em',
      marginTop: '0px',
      marginBottom:'100px'
      
    
  };

  const headerStyle = {
    justifyContent: 'center',
    padding: '0px',
    backgroundColor: '#ADD8E6',
    color: 'black',
    position: 'relative', // Ensure header content is relative to parent
  };

  const logoImgStyle = {
    height: 'auto',
    width:'120px',
    marginTop: '0px',
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
    fontSize:isMobile?'15px':'20px',
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
  



  const mainContentStyle = {
    
    padding: '10px',
    backgroundColor: '#ffffff',
    transition: 'margin-left 0.3s ease', // Add transition for smooth adjustment
    justifyContent:'',
    display:'inline-block',
    width:isMobile?'100%':'80%',
    alignItems:'center',
    //border:'2px solid blue',
    //boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
    borderRadius:'10%',
    marginBottom:'50px',
    marginTop:'50px',


  };


  const pStyle = {
    fontFamily:'Pamega Script',
    fontSize: '2em',
    color: '#333',
    justifyContent:'center',
    width:'100%',
  };







  const footerStyle = {
    padding: '20px',
    backgroundColor: '#4682B4',
    color: 'white',
    textAlign: 'left',
    marginTop: 'auto', // Pushes footer to the bottom
    width: '100%', // Ensure footer spans full width
    display: 'flex',
    justifyContent: 'space-between', // Spread out footer content
    flexWrap: 'wrap', // Allow wrapping for smaller screens
    position: 'relative', // Ensure footer content is relative to parent
  };

  const footerSectionStyle = {
    marginBottom: '20px',
    flex: '1 1 200px', // Allow each section to grow and shrink, minimum width 200px
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
  const buttonS = {
    display: 'inline-block',
    width: isMobile ? '' : '20%',
    marginTop: '50px',
    padding: '20px 50px',
    fontSize: '2em',
    color: 'white',
    backgroundColor: '#4682B4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '50px',
    whiteSpace: 'nowrap', // Prevents text wrapping
    overflow: 'hidden', // Ensures content does not overflow
    textOverflow: 'ellipsis' // Adds "..." if content overflows
};

  const aboutS = {
    fontFamily:'Great Vibes',
    fontSize: '2em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
  };
  const aboutp = {
    fontFamily:'Great Vibes',
    fontSize: '2em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
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
    <a href="/About" style={linkStyle}>About</a>
    <a href="/TourPackages" style={linkStyle}>Tour Packages</a>
    <a href="/ContactUS" style={linkStyle}>Contact</a>
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
     
      <main>
        <div style={mainContentStyle}>
        <p style={{fontSize:isMobile?'1em':'1.4em',display:'inline-block',width:isMobile?'100%':'60%',textAlign:isMobile?'center':'center'}}>
       <p style={{fontSize:isMobile?'1em':'1.2em'}}> Thank you for taking the time to provide feedback on your booking experience with Travel Sri Lanka.</p>

<p>We are committed to delivering exceptional service and creating unforgettable travel experiences for our clients. Your input is invaluable to us, and we appreciate your thoughts on how we can continue to improve our services.</p>

<p> We’re here to help and ensure that every aspect of your travel experience meets your expectations.</p>

<p>Thank you once again for choosing Travel Sri Lanka. We look forward to serving you and making your journey with us truly remarkable!</p>

<p>Warm regards,</p>
<p>The Travel Sri Lanka</p>
        </p>
      

<br />
            </div>
           
            
           
      </main>
      <div>
      <a href="/" style={buttonS}>Back to Home</a>
      </div>


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

export default Afterfeedback;
