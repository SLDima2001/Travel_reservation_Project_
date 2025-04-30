import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';
import "animate.css/animate.compat.css"
import ScrollAnimation from 'react-animate-on-scroll';





function About() {
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
    flex: '1', // Allow main content to grow to fill remaining space
    padding: '50px',
    backgroundColor: '',
    transition: 'margin-left 0.3s ease', // Add transition for smooth adjustment
    display:'inline-block',
    width:'90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    marginBottom:'50px',
    marginTop:'50px',
    border:'0px solid blue',
    borderRadius:'80px',
  };

  const h2Style = {
    fontFamily:'Rockybilly',
    display:'inline-block',
    '@media (max-width: 768px)': {
    display: 'none',
  },
    color: '#4682B4',
    fontSize:'2em',
    margin: '0',
    padding: '20px',
    borderRadius: '40px',
    //border:'2px solid blue',
    //boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
    width:'25%',
  };

  const pStyle = {
    fontFamily:'Feeling Lovely',
    fontSize: '2.5em',
    color: '#333',
    textAlign:'center',
  };
  const pStyle1 = {
    fontFamily:'Awesome Season Personal',
    fontSize: '1em',
    color: '#333',
    textAlign:'center',
  };
  const pStyle2 = {
    fontFamily:'Great Vibes',
    fontSize:isMobile? '20px':'25px',
    color: '#333',
    textAlign:'center',
  };






  const photodesstyle = {
    fontSize:'20px',
    marginTop: '10px',
    color: '#333',
    justifyContent:'center'
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
  


  
  return (
    
    <div style={appStyle}>
    

      <header style={header1style} >
      

            
      </header>
      <section style={headerStyle}>
      <div style={navbarStyle2}>
  {/* Left Section: Logo */}
  <div>
  <img src="./images/logo.jpeg" alt="Logo" style={logoImgStyle} />
  </div>
  
  {/* Center Section: Navigation Links */}
  <div style={navLinksStyle}>
    <a href="/" style={linkStyle}>Home</a>
    <a href="/About" style={linkStyle}><b>About Us</b></a>
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
          
        
       
        <div style={{alignItems:'center'}}>
        <p style={{pStyle1,fontSize:isMobile?'40px':'40px'}}>
       <br /><br /><b> Welcome to Travel Sri Lanka: Your Gateway to Sri Lanka </b> <br /></p><br /><br />
      
<p style={{pStyle,fontSize:isMobile?'30px':'30px'}}><b>‘Where Family, Passion, and Adventure Meet’</b></p><br />

<p style={{pStyle , fontSize:isMobile?'20px':'28px'}}>At Travel Sri Lanka, we believe that travel is more than just visiting new places—it's about creating unforgettable memories and experiencing the heart and soul of a destination. As a family-run travel agency with over two decades of experience, we bring a personal touch and deep local knowledge to every journey we plan.
<br /><br /><br /><b><p style={{marginBottom:'20px',}}>Our Story</p></b><br />

<div style={{fontSize:isMobile?'20px':'25px'}}>
Travel Sri Lanka was born from a passion for sharing the island’s beauty, culture, and heritage. With years of local expertise, we craft unforgettable journeys from golden beaches to ancient wonders. Let us turn your Sri Lankan adventure into a cherished memory.
</div>

<div style={{display:isMobile?'inline-block':'flex',gap:'40%'}}>







</div>
<br /><b>Why Choose Travel Sri Lanka?</b><br />
<p style={pStyle2}><b>•	Personal Touch:</b> We treat every guest like a member of our own family, ensuring you receive personalized service and attention to detail that larger companies can't offer.<br />
<b>•	Expert Knowledge:</b> Our extensive local expertise allows us to create unique itineraries that highlight both hidden gems and popular landmarks, offering an authentic and enriching experience.<br />
<b>•	Passionate Team:</b> Our team consists of family members and close friends who share a love for travel and hospitality. We are committed to providing warm, friendly, and professional service to make your trip unforgettable.<br />
<b>•	Customized Experiences:</b> Every traveler is unique, and we offer tailor-made tours that cater to your specific interests, preferences, and pace. Whether you're seeking adventure, relaxation, or cultural immersion, we design the perfect trip for you.<br />
<b>•	Sustainable Tourism:</b> As locals, we are dedicated to preserving the natural beauty and cultural heritage of Sri Lanka. We support eco-friendly practices and promote responsible tourism to ensure that future generations can enjoy the wonders of our island.<br />
</p>
<br /><br /><b>Our Services<br /></b>
<b>•	Custom Tours:</b> Personalized itineraries designed to suit your interests and needs.<br />
<b>•	Cultural Excursions:</b> Explore Sri Lanka’s rich history and heritage with knowledgeable guides.<br />
<b>•	Adventure Trips:</b> From surfing and hiking to wildlife safaris, experience thrilling adventures.<br />
<b>•	Family Vacations:</b> Fun and engaging activities for travelers of all ages.<br />
<b>•	Luxury Travel:</b> Enjoy the finest accommodations and exclusive experiences.<br /><br /><br />
Join the Travel Sri Lanka Family<br />
Embark on a journey with Travel Sri Lanka and discover the true essence of Sri Lanka. Let our family take care of yours and create memories that will last a lifetime.<br />
We look forward to welcoming you to our beautiful island and providing you with an exceptional travel experience.<br />
Contact Us Today:

</p>
<br />
</div>


</div>
<div> {/* Right-aligned content */}
  <Link to="/BookingForm" style={bookbuttonstyle2}>
  <b>Book Now</b>
            </Link> 
  </div>
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

export default About;
