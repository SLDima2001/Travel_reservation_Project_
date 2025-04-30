import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar,faEnvelope,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';
import axios from 'axios';



function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setMessage] = useState('');
  const [isformvisible, setisformvisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [borderColor, setBorderColor] = useState('#3498db'); // Initial color (blue)
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');



  


  useEffect(() => {
    // Check if the user is authenticated
    axios.get('http://localhost:5555/api/auth/login')
      .then((response) => {
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true'); // Update local storage
        } else {
          setIsLoggedIn(false);
          localStorage.setItem('isLoggedIn', 'false'); // Update local storage
        }
      })
      .catch((error) => {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);  // If the API fails, consider the user as a guest
        localStorage.setItem('isLoggedIn', 'false'); // Update local storage
      });
  }, []);


 

  const showAlert = () => {
    alert('Thank you for choosing Lahiru Tours! We are excited to assist you in planning your perfect Sri Lankan adventure. Our team will promptly get back to you within 24 hours with a customized itinerary tailored to your interests and needs.For any immediate questions or additional information, please feel free to contact us directly at info@lahirutours.co.uk.We look forward to making your travel dreams come true!Warm regards,The Lahiru Tours Team');
    
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const handleMouseEnter = () => {
    setBorderColor('#e74c3c'); // Red when hovering
  };

  const handleMouseLeave = () => {
    setBorderColor('#3498db'); // Reset to blue when not hovering
  };

  const handleLogin = () => {
    // Simulate a login action
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Update local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Update local storage
  };

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    //display: 'flex',
    //flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    width:isMobile?'100%':'100%',
    display: isMobile ? 'block' : 'flex',
     flexDirection: isMobile ? 'row' : 'column'
    
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
    width: 'auto',
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
    justifyContent: 'flex-start', // Aligns content to the left
    alignItems: 'center',
    width: 'auto',
    height: '120px',
    padding: '10px 0px 0px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    // zIndex: '2000',
    
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
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    marginTop: '60px', // To compensate for fixed header height
    width:isMobile?'100%':'auto',
    //backgroundImage: 'url("https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover', // ensures the image covers the entire element
    backgroundPosition: 'center', // centers the image
  };

  const tourPackagesStyle = {
    flex: isMobile?'2':'4',
    padding:isMobile? '10px' : '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    maxWidth: isMobile?'100%':'100%',
    transition: 'background-color 0.3s ease',
    width:'100%',
    
  };

  const h2Style = {
    fontSize: '2em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
  };
  const h12Style = {
    fontFamily:'Great Vibes',
    fontSize: '4em',
    margin: '0',
    color: '#4682B4',
    padding: '20px',
    borderRadius: '40px',
    display: 'inline-block',
    //border:'2px solid blue',
    //boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  };
  const desstyle = {
    fontFamily:'Vinque',
    fontSize:isMobile? '1.2em':'1.5em',
    margin: '0px',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    maxWidth: 'auto',
    marginTop:'100px',
    textAlign:isMobile?'justify':'center',
  }

  const packageOptionsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap:isMobile? '20px':'200px',
    marginTop:isMobile?'10px':'40px',
    //border:'20px solid blue',
    padding:isMobile?'10px':'20px',
    //boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
    borderRadius:isMobile?'10px':'30px',
    marginBottom:isMobile?'100px':'50px',
    
  };

  const packageStyle = {
    textAlign: 'center',
    fontSize:'15px',
    backgroundColor: '',
    padding: '20px ',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 1, 1, 1)',
    Width: isMobile ? 'auto' : 'auto', // Adjust width for mobile and PC views
    height:isMobile?'auto':'auto',
    borderColor:'',
   // flexWrap: 'wrap',
   // flex:isMobile?'': '0 1 calc(25% - 10px)',
   
  };

  const fbstyle= {
    height: '220px',
    width: '700px',
    borderRadius: '0px',
    justifyContent: 'center',
    padding: '0px',
    paddingTop: '100px',
    marginLeft: '',
    display:''
  };
  const fb1style= {
    height: '0%',
    width: 'auto',
    borderRadius: '0px',
    justifyContent: 'center',
    padding: '0px',
    paddingTop: '100px',
    display:'inline-block',
    
  };
  
  

  const packageImgStyle = {
    height: isMobile?'400px':'200px',
    width: isMobile? '500px':'200px',
    padding:'',
    borderRadius: '5%',
    justifyContent: 'center',
  };

  const h42Style = {
    marginTop: '40px',
    color: '#333',
    backgroundColor:'',
    textAlign: 'left',
    width: '60px',
    
  };

  const formStyle = {
    flex: '1',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '',
    border: '2px solid #3498db',
    boxShadow: '0 4px 8px rgba(1, 1, 1, 1)',
    maxWidth: 'auto',
    fontFamily: 'Arial, sans-serif',
    position: 'fixed',
    top:isMobile? '30px' : 'auto', // To align with the header
    bottom:'0px',
    display: isformvisible ? 'block' : 'none', // Show/hide based on state
    right: '20px',
    zIndex: '10000',
    height:isMobile?'auto':'auto',
    marginRight: '103px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
   minHeight:isMobile?'auto':'auto',
    
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '0px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '0px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: 'auto',
  };

  const buttonStyle = {
    backgroundColor: '#4682B4',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
    display: '',
    backgroundColor: '#4682B4',
      color: 'white',
      padding: '30px 30px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.6em',
      marginTop: '0px',
      
    
  };
  const hoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'scale(1)',
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

  const handleToggleForm = () => {
    setisformvisible(!isformvisible);
  };
  const iconStyle = {
    fontSize: '1.0em',  // Adjust the font size
    margin: '20px',   // Add margin around each icon
    color: '#007bff',  // Change the icon color
    marginRight: '-120px',
    marginTop:'-20px',
    gap:'10px',
    
  };
  const bannerstyle= {
    height:isMobile? '200px':'auto',
    width: '100%',
    borderRadius: '0px',
  };
  const h0style = {
    fontSize: '2em',
    textAlign: 'center',
    margin: '100px',
    color: '#333',
    padding: '0px',
    borderRadius: '8px',
    display: 'relative',
    
  };
 
  const pricestyle = {
   fontSize:'1.4em',
    color:'red',
    
  };
  
 
  return (
    <div style={appStyle}>


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



     
      

      <section style={headerStyle}>
      <div style={navbarStyle2}>
  {/* Left Section: Logo */}
  <div>
  <img src="./images/logo.jpeg" alt="Logo" style={logoImgStyle} />
  </div>
  
  {/* Center Section: Navigation Links */}
  <div style={navLinksStyle}>
    <a href="/" style={linkStyle}><b>Home</b></a>
    <a href="/About" style={linkStyle}>About Us</a>
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
      
      <div>
        <img style={bannerstyle} src="https://lahirutours.co.uk/photos/banner.gif" alt="Banner Photo" />
      </div>
      

      

     

      <div style={mainContentStyle}>
        <div style={tourPackagesStyle}>

          
         <p style={{fontSize:isMobile?'1em':'1.5em',fontFamily:'Agraham',width:'auto',backgroundColor:'',}}><b>
          
          <p style={{fontSize:'1.2em',}}>Welcome to Travel Sri Lanka</p></b><br />
<p>At Travel Sri Lanka, we pride ourselves on being more than just a travel agency. As a family-run business, we bring a personal touch and heartfelt dedication to every journey we plan. Our passion for travel and commitment to exceptional customer service stem from our deep love for Sri Lanka, and we are eager to share its wonders with you.</p>

<p><br /><b>Our Story </b><br />
Travel Sri Lanka was born from a passion for sharing the island’s beauty, culture, and heritage. With years of local expertise, we craft unforgettable journeys from golden beaches to ancient wonders. Let us turn your Sri Lankan adventure into a cherished memory.</p>

<br /></p>

          <h2 style={h12Style}><b>Tour Packages</b></h2>
          <div style={packageOptionsStyle}>

            <a style={packageStyle} href="/Days6">
            
            <h4>Sri Lanka 6 Days Tour</h4> <br />
            
              <img src="https://lahirutours.co.uk/photos/Day6.gif" alt="Package 1" style={packageImgStyle} />
              
              <h4 style={h42Style}>Days 6</h4>
              <div>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              
              </div>  
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $1,500 P\P</h1>
              <h1 style={pricestyle}><b>Price $1,100 P\P</b></h1>
              </div>
             
            </a>

            <a style={packageStyle} href="/Days8">
            
            <h4>Sri Lanka 8 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day8.gif" alt="Package 2" style={packageImgStyle} />
              <h4 style={h42Style}>Days 8</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $1,800 P\P</h1>
              <h1 style={pricestyle}><b>Price $1,400 P\P</b></h1>
            
            </a>

            <a style={packageStyle} href="/Days10">
            <h4>Sri Lanka 10 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day10.gif" alt="Package 3" style={packageImgStyle} />
              <h4 style={h42Style}>Days 10</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,100 P\P</h1>
              <h1 style={pricestyle}><b>Price $1,650 P\P</b></h1>
            </a>


            <a style={packageStyle} href="/Days12">
            
            <h4>Sri Lanka 12 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day12.gif" alt="Package 4" style={packageImgStyle} />
              <h4 style={h42Style}>Days 12</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,300 P\P</h1>
              <h1 style={pricestyle}><b>Price $1,800 P\P</b></h1>
            
            </a>



            <a style={packageStyle} href="/Days15">
           
            <h4>Sri Lanka 15 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day15.gif" alt="Package 5" style={packageImgStyle} />
              <h4 style={h42Style}>Days 15</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,400 P\P</h1>
              <h1 style={pricestyle}><b>Price $2,049 P\P</b></h1>
            
            </a>


            <a style={packageStyle} href="/Days18">
           
            <h4>Sri Lanka 18 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day18.gif" alt="Package 6" style={packageImgStyle} />
              <h4 style={h42Style}>Days 18</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,700 P\P</h1>
              <h1 style={pricestyle}><b>Price $2,449 P\P</b></h1>
           
            </a>


            <a style={packageStyle} href="/Days182">
            
            <h4>Sri Lanka 18 Days North &South</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day18n.gif" alt="Package 7" style={packageImgStyle} />
              <h4 style={h42Style}>Days 18</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" /> 
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,750 P\P</h1>
              <h1 style={pricestyle}><b>Price $2,449 P\P</b></h1>
           
            </a>


            <a style={packageStyle} href="/Days20">
            
            <h4>Sri Lanka 20 Days Tour</h4><br />
              <img src="https://lahirutours.co.uk/photos/Day20.gif" alt="Package 8" style={packageImgStyle} />
              <h4 style={h42Style}>Days 20</h4>
              <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="1x" />
              <FontAwesomeIcon  icon={faUtensils} size="1x" />
              <FontAwesomeIcon  icon={faCar} size="1x" />  
              </div>
              <h1 style={{pricestyle , textDecoration: 'line-through'}}>Price $2,990 P\P</h1>
              <h1 style={pricestyle}><b>Price $2,689 P\P</b></h1>
            
            </a>
            </div>
            <div style={{fontSize:isMobile?'1.5em':'1.8em',fontSmooth:'100px',backgroundColor:'',color:'#4682B4'}}>
            <p style={{color:'red',fontSize:'1.5em'}}>Special Discount</p> for Couples! 
            <p style={{fontSize:'1.5em',color:'red'}}>25% Off</p>
            <a style={{color:'#4682B4',fontSize:'1em'}} href="/TourPackages"><u>For more Info</u></a>

            </div><br />

            <div style={{textAlign:isMobile?'justify':'center'}}><br /><br />
            <p><p style={{fontSize:isMobile?'25px':'1.5em'}}> <b> Why Choose Travel Sri Lanka?</b></p><br />
            <p style={{fontSize:isMobile?'1.1em':'1.3em'}}>
<b>Personal Touch:</b> As a family-run business, we treat every guest as an extension of our family. This means you receive personalized service and attention to detail that larger companies can't offer. <br />
<b>Expert Knowledge:</b> Our extensive local knowledge allows us to craft unique itineraries that showcase the best of Sri Lanka. Whether it's hidden gems or popular landmarks, we ensure your experience is authentic and enriching.<br />
<b>Passionate Team:</b> Our team consists of family members and close friends who share a passion for travel and hospitality. We are committed to providing warm, friendly, and professional service to make your trip unforgettable.<br />
<b>Customized Experiences:</b> We understand that every traveler is unique. That's why we offer tailor-made tours that cater to your interests, preferences, and pace. Whether you're seeking adventure, relaxation, or cultural immersion, we design the perfect trip for you.<br />
<b>Sustainable Tourism:</b> As locals, we are committed to preserving the natural beauty and cultural heritage of Sri Lanka. We support eco-friendly practices and promote responsible tourism to ensure that future generations can enjoy the wonders of our island.</p><br />
<h1><b><p style={{fontSize:isMobile?'30px':'1.2em',marginBottom:'40px',marginTop:'20px'}}>Our Services</p></b></h1>
<p style={{fontSize:isMobile?'1.2em':'1.5em'}}><b>Custom Tours:</b> Personalized itineraries designed to suit your interests and needs. <br />
<b>Cultural Excursions:</b> Explore Sri Lanka’s rich history and heritage with knowledgeable guides.<br />
<b>Adventure Trips:</b> From surfing and hiking to wildlife safaris, experience thrilling adventures.<br />
<b>Family Vacations:</b> Fun and engaging activities for travelers of all ages.<br />
<b>Luxury Travel:</b> Enjoy the finest accommodations and exclusive experiences. <br /><br />
Join Travel Sri Lanka Family
Embark on a journey with Travel Sri Lanka and discover the true essence of Sri Lanka. Let our family take care of yours, and create memories that will last a lifetime. We look forward to welcoming you to our beautiful island and providing you with an exceptional travel experience.</p>

<br /><p style={{fontSize:isMobile?'1.3em':'1.2em'}}>Contact Us Today

Travel Sri Lanka – Where Family, Passion, and Adventure Meet!</p></p>
            </div>
            
             <br /><br />
            <p style={desstyle}>We offer both cars and vans to suit your preferences. We recommend cars for couples and vans for small groups, but your choice always comes first. All our vehicles are fully air-conditioned to ensure a comfortable and safe ride. Our partner hotels provide great comfort, excellent food, and high-standard services. We strive to deliver the best experience to ensure you have a highly satisfactory tour with us.

Tour PackagesWe offer flexible and engaging packages designed to help you enjoy and relax during your stay in Sri Lanka. Our packages are reasonably priced and include very comfortable hotels and meals tailored to your preferences.</p>
          



          <br /><br /><br />
         
            
          <Link to="/travelreco" style={{ 
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
        <b>Travel Budy Matching</b>
    </Link>
    

            
           <div style={fbstyle}>

          <button
          onClick={handleToggleForm}
          style={{
            position: 'fixed',
            top: '200px',
            right: '00px',
            backgroundColor: '#4682B4',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            zIndex: '1000',
          }}
        >
          
          {isformvisible ? <FontAwesomeIcon  icon={faEnvelopeOpen} size="2x" /> : <FontAwesomeIcon  icon={faEnvelope} size="2x" />} <br /> Contact US
        </button>
           
            
            </div> 
           
        
        </div>
        
       
        

        
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

export default Home;
