import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Gallery() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#e0f7fa',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const headerStyle = {
    justifyContent: 'center',
    padding: '0px',
    //backgroundColor: '#ADD8E6',
    color: 'black',
    position: 'relative',
  };

  const logoImgStyle = {
    height: '120px',
    width:'120px',
    marginTop: '0px',
  };

  const h1Style = {
    fontSize: '4em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
    marginLeft: '-1600px',
  };

  const paraStyle = {
    color: 'black',
    marginLeft: '-1600px',
  };

  const contactInfoStyle = {
    marginLeft: 'auto',
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
    fontSize:'20px',
    backgroundColor: 'white',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: '',
    top: '0',
    left: '0',
    width: '100%',
    height: '120px',
    padding: '10px 0px 0px  ',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    transform: isNavbarVisible ? 'translateY(0)' : 'translateY()',
    zIndex: '1000',
  };
  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  const liStyle = {
    marginBottom: '20px',
  };

  const mainContentStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginLeft: isNavbarVisible ? '100px' : '0',
    transition: 'margin-left 0.3s ease',
  };

  const h2Style = {
    color: '#4CAF50',
  };

  const pStyle = {
    fontSize: '1.2em',
    color: '#333',
  };

  const tourPackagesStyle = {
    padding: '20px',
    backgroundColor: '#e0f7fa',
    backgroundImage: 'url()',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const slideshowstyle = {
    padding: '20px',
    backgroundColor: '#e0f7fa',
    backgroundImage: 'url()',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const h3Style = {
    color: '#00796b',
  };

  const packageOptionsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '150px 0',
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

  const socialMediaStyle = {
    display: 'flex',
    gap: '10px',
  };

  const socialLinkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const loginButtonStyle = {
    marginLeft: '2000px',
    padding: '10px',
    marginTop: '-100px',
  };

  const aStyle = {
    display: 'block',
    color: 'white',
    padding: '14px 16px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const carouselImageStyle = {
    maxWidth: '100%',
    maxHeight: '1200px', // Adjust this value to your desired image height
    objectFit: 'cover', // Ensure the image covers the area
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <div>
          <img src="https://via.placeholder.com/150" alt="Logo" style={logoImgStyle} />
          <h1 style={h1Style}>Lahiru Tours</h1>
         
        </div>
       
      </header>
      <nav style={navbarStyle} onMouseEnter={toggleNavbar} onMouseLeave={toggleNavbar}>
        <ul style={ulStyle}>
          <li style={liStyle}><a href="/" style={aStyle}>Home</a></li>
          <li style={liStyle}><a href="/About" style={aStyle}>About</a></li>
          <li style={liStyle}><a href="/TourPackages" style={aStyle}>Tour Packages</a></li>
          <li style={liStyle}><a href="/Gallery" style={aStyle}>Gallery</a></li>
          <li style={liStyle}><a href="/ContactUS" style={aStyle}>Contact Us</a></li>
          <li style={liStyle}><a href="/Feedback" style={aStyle}>Feedbacks</a></li>
        </ul>
      </nav>

      <section style={slideshowstyle}>
        <Carousel showArrows autoPlay infiniteLoop>
          <div>
            <img src="https://images.unsplash.com/photo-1567157802189-aadc856131dc?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1580398469333-5b425875c077?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2020/05/01/06/03/galle-5115527_1280.jpg" alt="Slide 3" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2020/02/22/09/23/green-4869996_1280.jpg" alt="Slide 4" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1582103518581-46fe9a449915?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 5" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1559038267-bfa6d8d3a160?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1584804431210-6fff43aa8abd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" style={carouselImageStyle} />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1704797389202-7910a4f002ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" style={carouselImageStyle} />
          </div>
        </Carousel>
      </section>

     
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
            <li style={footerListItemStyle}><a href="#" style={socialLinkStyle}>Twitter</a></li>
            <li style={footerListItemStyle}><a href="#" style={socialLinkStyle}>Instagram</a></li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerSectionTitleStyle}>Contact Us</h4>
          
          <p><u>
            info@lahirutours.co.uk<br />
            admin@lahirutours.co.uk <br />
            payment@lahirutours.co.uk <br />
            nipun_virajitha@lahirutours.co.uk <br />
            gamini@lahirutours.co.uk <br /></u>

            
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Gallery;
