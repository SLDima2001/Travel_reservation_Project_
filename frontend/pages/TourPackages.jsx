import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar,faEnvelope,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';
import axios from "axios";

function TourPackages() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [texts, setTexts] = useState([]);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };

   

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/get-texts");
      setTexts(response.data);
    } catch (error) {
      console.error("Error fetching texts", error);
    }
  };



  const packages = [
    { id: 1, name: '6 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day6.gif', link: '/Days6', price: 100, description: 'Enjoy a 6 Days tour exploring beautiful destinations.' },
    { id: 2, name: '8 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day8.gif', link: '/Days8', price: 150, description: 'Experience an 8 Days adventure filled with fun and excitement.' },
    { id: 3, name: '10 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day10.gif', link: '/Days10', price: 200, description: 'Discover the wonders of a 10-days tour.' },
    { id: 4, name: '12 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day12.gif', link: '/Days12', price: 300, description: 'A 12 days journey to explore the best sights and sounds.' },
    { id: 5, name: '15 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day15.gif', link: '/Days15', price: 300, description: 'A 15 days journey to explore the best sights and sounds.' },
    { id: 6, name: '18 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day18.gif', link: '/Days18', price: 350, description: 'An 18 days tour to immerse yourself in rich culture and history.' },
    { id: 7, name: '18 Days North & South Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day18n.gif', link: '/Days182', price: 350, description: 'An 18 days North & South tour to immerse yourself in rich culture and history.' },
    { id: 8, name: '20 Days Sri Lanka Tour', imgSrc: 'https://lahirutours.co.uk/photos/Day20.gif', link: '/Days20', price: 400, description: 'A 20 days expedition to experience everything.' },
  ];

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    width:isMobile?'100%':'100%',
  };

  const headerStyle = {
    justifyContent: 'center',
    padding: '0px',
    backgroundColor: '#ADD8E6',
    color: 'black',
    position: 'relative',
  };

  const logoImgStyle = {
    height: 'auto',
    width:'120px',
    marginTop: '0px',
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

  
  const header1style = {
    display:'flex',
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



  const mainContentStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: '',
    transition: 'margin-left 0.3s ease',
    position: 'relative',
  };

  const tourPackagesStyle = {
    display:isMobile?'relative':'',
    padding:isMobile? '0px':'20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    alignContent:'center',
    width:isMobile?'auto':'auto',
    height:isMobile?'auto':'auto',
    flex:isMobile?'1':'4',
  };

  const packageOptionsStyle = {
    display:isMobile? 'inline-block':'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '00px 0',
    alignContent:'center',
  };

  const packageStyle = (isHovered) => ({
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border:'2px solid #4682B4',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    transform: isHovered ? 'translateY(-20px)' : 'translateY(10px)',
    transition: 'transform 3s ease, box-shadow 2s ease',
    //zIndex: isHovered ? '1' : '5',
    //position: 'center',
    flex:isMobile?'1':'4',
    gap:isMobile?'100px' : '20px',
    width:isMobile?'200px':'auto',
    alignItems:'center',
    display:isMobile?'':'flex',
  });

  const blurredBackgroundStyle = {
    filter: 'blur(10px)',
    transition: 'filter 0.3s ease',
  };

  const packageImgStyle = {
    marginTop:'20px',
    marginBottom:'20px',
    height: '150px',
    width:'150px',
    borderRadius: '10px',
    justifyContent:'center',
  };

  const h4Style = {
    marginTop: '10px',
    color: '#333',
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


  const handlePackageClick = (link) => {
    window.location.href = link;
  };

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
    <a href="/TourPackages" style={linkStyle}><b>Tour Packages</b></a>
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
      
      <main style={isNavbarVisible ? { ...mainContentStyle, ...blurredBackgroundStyle } : mainContentStyle}>
      <div style={{ marginRight: '0%',marginTop:'19px' }}> {/* Right-aligned content */}
    
  
  </div>
        <section style={tourPackagesStyle}>
          <div style={packageOptionsStyle}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={packageStyle(hoveredPackage === pkg.id)}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
                onClick={() => handlePackageClick(pkg.link)}
              >
                <a href={pkg.link}>
                  <img src={pkg.imgSrc} alt={pkg.name} style={packageImgStyle} />
                  <h4 style={h4Style}><br />{pkg.name}</h4>
                 
                  {hoveredPackage === pkg.id && <p>{pkg.description}</p>}
                  <p style={{color:'blue'}}><u>Click For More....</u></p>
                </a>
              </div>
            ))}
          </div>

<div style={{ width: "80%", margin: "20px auto", textAlign: "center" }}>
<br></br>
<h4 style={{ fontSize: '30px' }}><b>DISCOUNT</b></h4>
<br></br>

      {texts.length > 0 ? (
        texts.map((item) => (
          <div key={item._id} style={{ 
            borderBottom: "1px solid #ccc", 
            padding: "10px", 
            fontSize: "14px", 
            color: "#333",
            textAlign: "justify" // Adjusted for better readability
          }}>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        ))
      ) : (
        <p>No texts available</p>
      )}
    </div>

          
        </section>

        
      </main>
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

export default TourPackages;
