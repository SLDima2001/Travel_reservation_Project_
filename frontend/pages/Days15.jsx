import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faCar,faEnvelope,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaInstagram,FaTiktok } from 'react-icons/fa';


function Days15() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [additionalDescriptions, setAdditionalDescriptions] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false,
    day8: false,
    day9: false,
    day10: false,
    day11: false,
    day12: false,
    day13: false,
    day14: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setMessage] = useState('');
  const [isformvisible, setisformvisible] = useState(false);
  const [notification, setNotification] = useState(null);
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
    setTimeout(() => {
      setNotification(null);
    }, 2000);
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
       };

       const logoImgStyle = {
        height: 'auto',
        width:'120px',
        marginTop: '0px',
      };

  const h1Style = {
   
    fontSize: '3em',
    color:'#4682B4',
    margin: '0',
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
  };
  
  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Adds space between buttons
  };



  const mainContentStyle = {
    flex: '1',
    padding: '20px 40px',
    transition: 'margin-left 0.3s ease',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const tourPackagesStyle = {
    backgroundColor: '',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    marginBottom: '20px',
    justifyContent: 'center',
  };

  const packageStyle = {
    marginBottom: '40px',
    justifyContent: 'center',
  };

  const packageDescriptionStyle = {
    //display:isMobile? 'inline-block':'',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: isMobile?'0px':'20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    position: 'center',
    textAlign:isMobile? 'justify':'left',
    maxWidth:isMobile? '100%':'80%',
  };

  const photoStyle = {
    display:isMobile?'flex':'',
    width:isMobile? '400px':'900px',
    height: isMobile?'400px':'700px',
    objectFit: 'cover',
    justifyContent:'center',
    margin: '20px 0',
    marginLeft:'px',
    borderRadius:'20px',
    //border:'5px solid #4682B4',
  };

  const additionalDescriptionStyle = {
    fontFamily:'Forever Brush Script',
    marginTop: '50px',
    marginLeft: '00px',
    marginRight: '00px',
    fontSize: '1.5em',
    textAlign: 'left',
  };

  const arrowButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1em',
    color: '#333',
    outline: 'none',
    marginBottom: '10px',
    transition: 'transform 0.8s ease',
  };

  const arrowButtonHoveredStyle = {
    transform: 'scale(1.1)',
  };

  const footerStyle = {
    padding: '20px 40px',
    backgroundColor: '#4682b4',
    color: 'white',
    textAlign: 'left',
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  };
  const iconStyle = {
    fontSize: '0.9em',  // Adjust the font size
    margin: '10px',   // Add margin around each icon
    color: '#007bff',  // Change the icon color
    marginRight: '00px',
    marginTop:'0px',
    alignItems:'left'
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

  const mapstyle = {
    display: isMobile ? 'none' : 'block', // Hide on mobile
    width: '900px',
    height: '700px',
    objectFit: 'cover',
    borderRadius: '5%',
    margin: '20px 100px',
    marginLeft:'000px',
  };
  const mapstyle2 = {
    display: isMobile ? 'block' : 'none', // Hide on pc
    width: '400px',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '5%',
    margin: '0px 00px',
    
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
    bottom:'10px',
    display: isformvisible ? 'block' : 'none', // Show/hide based on state
    right: '20px',
    zIndex: '999',
    //height:isMobile?'auto':'auto',
    marginRight: '103px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
   minHeight:isMobile?'auto':'80%',
    
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: '120px',
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
  const h2Style = {
    fontSize: '2em',
    margin: '0',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    display: 'inline-block',
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
   

    try {
      const response = await fetch('http://localhost:5555/contact', {
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
         // alert('Email sent successfully!');
          setName("");
          setEmail("");
          setPhone("");
          setsubject("");
          setMessage("");
          
        } else {
          alert('Failed to send email.');
        }
      } else {
        
      }
    } catch (error) {
      console.alert(error);
      alert('Error');
    }
    window.location.reload(); // Reload the page
  };
  const toggleAdditionalDescription = (day) => {
    setAdditionalDescriptions((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <div style={appStyle}>
      <header style={header1style} >
      <div style={navbarStyle}>
      {/* Left Section: Logo */}
      <div>
        <h1 style={{ margin: '0', padding: '0', fontSize: '1em' }}><b>info@lahirutours.co.uk</b></h1>
      </div>
      
      {/* Center Section: Navigation Links */}
      <div style={navLinksStyle}>
       
      </div>
      
      {/* Right Section: Buttons */}
      <div style={buttonContainerStyle}>
      <a href="https://www.facebook.com/share/TLHsJswwmcxzvuiA/?mibextid=WC7FNe" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <FaFacebook size={30} />
        </a>
        <a href="https://www.instagram.com/lahiru_tours_sri_lanka?igsh=azYyenZxaHZ6aW1y&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <FaInstagram size={30} />
        </a>
        <a href="https://vm.tiktok.com/ZGevyQ8eB/" target="_blank" rel="noopener noreferrer" style={{  padding: '10px 20px', cursor: 'pointer' }} >
          <FaTiktok size={30}  />
  </a>

        {/* Add more buttons as needed */}
      </div>

    </div>

            
      </header>

      <section style={headerStyle}>
      <div style={navbarStyle2}>
  {/* Left Section: Logo */}
  <div>
  <img src="https://lahirutours.co.uk/photos/logo.gif" alt="Logo" style={logoImgStyle} />
  </div>
  
  {/* Center Section: Navigation Links */}
  <div style={navLinksStyle}>
    <a href="/" style={linkStyle}>Home</a>
    <a href="/About" style={linkStyle}>About Us</a>
    <a href="/TourPackages" style={linkStyle}><b>Tour Packages</b></a>
    <a href="/ContactUS" style={linkStyle}>Contact</a>
    <a href="/feedback" style={linkStyle}>FAQ</a>
  </div>
  <div style={{ marginRight: '10px',marginTop:'19px',display:'flex',gap:'10px' }}> {/* Right-aligned content */}
     <Link to="/signin" style={bookbuttonstyle}>
     <b>Login</b>
               </Link> 
               <Link to="/register" style={bookbuttonstyle3}>
     <b>Register</b>
               </Link> 
     </div>
  
  
</div>
        
        
        
      </section>
      
      <h1 style={h1Style}><b>15 Day Tour Package</b></h1>
      <main style={mainContentStyle}>
        <section style={tourPackagesStyle}>
        <div style={{packageStyle , display:'flex',gap:isMobile?'0':'20%'}}>
          <div>
            <img
              src="https://lahirutours.co.uk/photos/Day15.gif"
              alt="Tour Image"
              style={{ ...photoStyle,objectFit:'cover' }}
            />
            </div>
            <div>
             <img
              src="https://lahirutours.co.uk/photos/Day 15.gif"
              alt="Tour Image"
              style={{ ...mapstyle }}
            />
            </div>
            </div><br />
            <div>
             <img
              src="https://lahirutours.co.uk/photos/Day 15.gif"
              alt="Tour Image"
              style={{ ...mapstyle2 }}
            />
            </div>

            
            <div style={{width:isMobile?'auto':'40%',display:'',border:'2px solid blue',boxShadow: '0px 4px 8px rgba(1, 1, 1, 1)',borderRadius:'10px',padding:'20px'}}>
           <h1 style={{fontSize:'1em',textAlign:'left',fontFamily:'Ubuntu'}}>All our tour packages include travel to all attractions during your travel. Additionally, all our packages include high standard hotel stays with breakfast and dinner provided throughout your stay</h1><br />

            <p style={{fontSize:'1.2em',textAlign:'left',fontFamily:'Oswald',color:'blue'}}><b>Note:</b></p><h1 style={{fontSize:'1.3em',textAlign:'left',fontFamily:'Nanum Gothic'}}> Our travel packages do not include airline tickets. If you would like us to arrange your airline tickets, please contact our admin team through our contact form or at <u>admin@lahirutours.co.uk.</u></h1>
            </div>
            
            <div style={{ ...packageDescriptionStyle, textAlign: 'left', alignItems: 'center' }}>
            <div style={iconStyle}>
              <FontAwesomeIcon  icon={faBed} size="3x" />
              <FontAwesomeIcon style={{padding:'10px'}}  icon={faUtensils} size="3x" />
              <FontAwesomeIcon  icon={faCar} size="3x" />  
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 1 - Negombo</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day1 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day1')}
                >
                  {additionalDescriptions.day1 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day1 && (
                  <div>
                    <h4>Explore the vibrant city of Colombo upon your arrival.</h4>
                    <p>
                    The sunny, coastal town of Negombo is a mere 20 minutes from Bandaranaike International Airport, making it the ideal place to start or end your journey in Sri Lanka. Affectionately dubbed ‘Little Rome’, Negombo offers a variety of attractions, from medieval churches and a noisy fish market to fresh seafood and some of the most scenic beaches on the island. The town’s rich history, with a predominant Dutch influence, is evident throughout.
<br /> <br />Activities: <br />
 <br />•	Arrive at Sri Lanka (Katunayake International Airport): Begin your journey with a warm welcome from our Olanka representative and driver at the airport.
 <br />•	Proceed to Negombo city: Travel to ‘Little Rome’ of Sri Lanka’s cultural heritage.<br />

•	Spend time at the beach: Relax on some of Sri Lanka’s most scenic beaches, enjoying the sun and the sea.<br />
•	Go for a boat ride: Experience the charm of Negombo's waterways with a leisurely boat ride.<br />
•	Visit the Dutch Fort: Explore the historical Dutch Fort, a testament to the town's colonial past.<br />
•	Visit St. Mary’s Church and Angurukaramulla Temple: Discover the religious heritage of Negombo by visiting St. Mary’s Church and the Angurukaramulla Temple.<br />
Enjoy your first day soaking in the vibrant culture and picturesque landscapes of Negombo!<br />

<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Negambo.jpg" alt="" />
                    </p>
                  </div>
                )}
              </div>



              <div style={additionalDescriptionStyle}>
                <p>Day 2 & 3 - Dambulla / Sigiriya</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day2 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day2')}
                >
                  {additionalDescriptions.day2 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day2 && (
                  <div>
                    
                  <p>
                  - Sigiriya & Dambulla <br /><br />
Welcome to Day 2 of your incredible Sri Lankan adventure! Today, we delve deeper into the rich cultural and historical tapestry of Sri Lanka, exploring two of the country’s most iconic landmarks.
Morning: Arrival and Sigiriya Exploration 
Begin your day with a refreshing breakfast at your hotel, then set out to explore Sigiriya, famously known as the "Lion Rock." A UNESCO World Heritage site, Sigiriya Rock Fortress is a magnificent ancient monument offering breathtaking views of the lush landscape below.
<br />•	Hike to Sigiriya Rock Fortress: Embark on a rewarding 30-minute hike to the summit, where you’ll be greeted by spectacular panoramic views of the surrounding countryside. As you ascend, take in the stunning frescoes, intricate water gardens, and the fascinating history of this ancient fortress.
Midday: Dambulla Cave Temple Complex
After your exhilarating hike, we will head to the Dambulla Cave Temple Complex, a historical gem of Sri Lanka. This impressive temple complex, dating back to the 1st century BC, is renowned for its beautifully preserved Buddhist murals and statues.
<br />•	Explore the Caves: Wander through the cave temples adorned with vibrant murals and statues of the Buddha, offering a glimpse into the spiritual and artistic heritage of ancient Sri Lanka.
Afternoon: Check-In and Relax
<br />•	Check-In: Return to your tropical hotel in Dambulla for some well-deserved relaxation. Unwind in your cozy room or take a moment to enjoy the serene surroundings of the hotel.
Evening: Village Walk and Dinner
<br />•	Village Walk: As the evening sets in, take a leisurely walk through the village to experience the local culture and atmosphere. Enjoy the peaceful environment as you reflect on the day’s explorations.
<br />•	Dinner: Return to the hotel for a colorful buffet dinner featuring a delightful array of local and international dishes, offering a feast for both the palate and the eyes.
<br /><br /><b>Activities Summary:</b> <br />
<br />•	Breakfast: Enjoy a delicious breakfast at your hotel
<br />•	Explore: Visit the ancient Sigiriya Rock Fortress
<br />•	Sightseeing: Discover the Dambulla Cave Temple Complex
<br />•	Check-In: Relax at your tropical hotel in Dambulla
<br />•	Dinner: Indulge in a diverse buffet meal at the hotel
<br />•	Relaxation: Take a serene walk through the village
<br />•	Overnight: Rest comfortably at your cozy hotel
Enjoy this day of cultural discovery and natural beauty as you immerse yourself in the rich heritage of Sri Lanka!<br /><br />


<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Sigiriya.jpg" alt="" />
                  </p>
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 4 & 5 - Kandy</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day3 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day3')}
                >
                  {additionalDescriptions.day3 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day3 && (
                  <div>
                  
                  <p>
                  The cultural heart of Sri Lanka, Kandy is surrounded by enchanting green nature and picturesque villages amidst tranquil landscapes. With breathtaking views of the famous Kandy Lake and home to the sacred relic of the Buddhist faith, Kandy is a must-visit destination. Explore the heritage of Sri Lanka’s last kingdom and take a stroll through the stunning Botanical Gardens, created by the British in the 19th century and still one of the most beautiful gardens in Asia. Walk the streets of Kandy, visit the local market, and enjoy performances of traditional Kandyan dances in the evening.
<br /><br />Activities:<br />
•	En route, visit Pinnawala Elephant Orphanage: Witness the care and conservation of elephants at this famous sanctuary.<br />
•	Check in at the beautiful hotel & refresh: Settle into your accommodation and refresh after your journey.<br />
•	Visit the famous Temple of the Tooth in Kandy: Explore one of the most sacred Buddhist sites in Sri Lanka.<br />
•	Enjoy a cultural dance in the evening: Experience the vibrant traditional Kandyan dances.<br />
•	Back to hotel for overnight stay: Relax and unwind in your comfortable hotel room.<br />
•	Enjoy your first Sri Lankan grand dinner buffet at the hotel: Savor a variety of local delicacies at the hotel buffet.<br />
•	Take a walk around the Kandy Lake at night: End your day with a peaceful stroll around the picturesque Kandy Lake.<br />
Enjoy your second day immersed in the cultural and historical richness of Kandy!<br />
<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Kandy.jpg" alt="" />
                  </p>
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 6 - Nuwara Eliya</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day4 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day4')}
                >
                  {additionalDescriptions.day4 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day4 && (
                  <div>
                    
                  <p>
                  Experience the captivating beauty of Sri Lanka on your journey to Nuwara Eliya. This mist-wrapped region, with its emerald peaks and verdant tea plantations, is sure to enchant you. Known as the "Little England" of South Asia, Nuwara Eliya offers a cool climate, scenic views, Tudor-style hotels, manicured hedgerows, and charming gardens. The rolling hills adorned with lush green tea leaves provide a stunning backdrop for your visit. The sound of waterfalls and the cool breeze create a fairytale-like experience that will leave you spellbound.
<br /><br />Activities<br />
•	Wake up to your first morning in paradise.<br />
•	Sip a warm cup of fresh Ceylon tea.<br />
•	Enjoy your first flavorful Sri Lankan breakfast buffet.<br />
•	Check out from the hotel in Kandy.<br />
•	Proceed to Nuwara Eliya (Little England).<br />
•	Stop at local batik and handicraft shops.<br />
•	Sightsee the passing views of tea gardens and waterfalls.<br />
•	Visit a Ceylon tea plantation and tea factory.<br />
•	Check in at the cozy hotel in Nuwara Eliya and relax.<br />
•	Visit Gregory Lake later to soak in the sunset.<br />
•	Walk around chilly "Little England".<br />
<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Nuwaraeliya.jpg" alt="" />
                  </p>
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 7 & 8 - Arugam Bay</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day5 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day5')}
                >
                  {additionalDescriptions.day5 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day5 && (
                  <div>
                    
                    <p>
                    The cultural heart of Sri Lanka, Kandy is surrounded by enchanting green nature and picturesque villages amidst tranquil landscapes. With breathtaking views of the famous Kandy Lake and home to the sacred relic of the Buddhist faith, Kandy is a must-visit destination. Explore the heritage of Sri Lanka’s last kingdom and take a stroll through the stunning Botanical Gardens, created by the British in the 19th century and still one of the most beautiful gardens in Asia. Walk the streets of Kandy, visit the local market, and enjoy performances of traditional Kandyan dances in the evening.
<br /><br />Activities:<br />
•	En route, visit Pinnawala Elephant Orphanage: Witness the care and conservation of elephants at this famous sanctuary.<br />
•	Check in at the beautiful hotel & refresh: Settle into your accommodation and refresh after your journey.<br />
•	Visit the famous Temple of the Tooth in Kandy: Explore one of the most sacred Buddhist sites in Sri Lanka.<br />
•	Enjoy a cultural dance in the evening: Experience the vibrant traditional Kandyan dances.<br />
•	Back to hotel for overnight stay: Relax and unwind in your comfortable hotel room.<br />
•	Enjoy your first Sri Lankan grand dinner buffet at the hotel: Savor a variety of local delicacies at the hotel buffet.<br />
•	Take a walk around the Kandy Lake at night: End your day with a peaceful stroll around the picturesque Kandy Lake.<br />
Enjoy your second day immersed in the cultural and historical richness of Kandy!<br />
<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Arugambay.jpg" alt="" />
                    </p>
                  </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 9 - Ella</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day6 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day6')}
                >
                  {additionalDescriptions.day6 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day6 && (
                  <div>
                    
                  <p> 
                  
                  Ella: A Journey Through Scenic Splendor<br />
<b>Welcome to Ella!</b> <br />Nestled in the heart of Sri Lanka’s hill country, Ella is a picturesque gem that captivates every traveler. Today’s itinerary promises breathtaking views, thrilling adventures, and tranquil moments of relaxation as you explore this enchanting town.<br />
Morning: Scenic Train Ride and Arrival in Ella
Start your day with the refreshing coolness of Nuwara Eliya’s misty mountains. Enjoy a warm cup of Ceylon tea as you savor the serene beauty of your surroundings.
After breakfast, it’s time for one of the world’s most scenic train journeys. Board the train from Nuwara Eliya to Ella and prepare to be amazed by the stunning landscapes that unfold before you. The journey offers panoramic views of verdant tea plantations, lush forests, and charming countryside—truly a visual feast!
Upon arriving in Ella, head straight to the Nine Arches Bridge, a marvel of colonial engineering set against a backdrop of emerald green hills. This iconic bridge, surrounded by lush foliage, is the perfect spot for some memorable photographs.
<br />Afternoon: Adventure and Relaxation
Next, prepare for an adrenaline rush with an exciting zip-lining experience over the picturesque tea fields. Feel the thrill as you soar through the air and take in sweeping views of the landscape below.
After your zip-lining adventure, it’s time to refresh and relax. Visit the Diyaluma Falls and take a refreshing dip in its natural pools. The cool, cascading water and serene environment offer a perfect escape from the hustle and bustle of daily life.
Enjoy a delicious lunch featuring fresh strawberries and milkshakes—simple pleasures that make this day extra special.
<br />Evening: Exploration and Relaxation
In the late afternoon, embark on a gentle walk through Ella’s scenic hill country vegetation. As you wander through the lush greenery, let the natural beauty of the area soothe your senses.
Check in to your charming Ella hotel and take some time to relax and refresh.
As evening descends, visit the Ella Gap, where you can marvel at the vast views stretching out before you, and then make your way to Mini Adam’s Peak for a serene hike and panoramic vistas.
Before dinner, explore the quaint village of Ella, soaking in the tranquil ambiance and perhaps picking up some local crafts.
Enjoy a hot and hearty grand dinner buffet at the hotel as you reflect on the day’s adventures.
<br /><br />Activities:<br />
•	Wake Up: Greet the day with a scenic view of the misty mountains in Nuwara Eliya.<br />
•	Tea Time: Start your day with a cup of fresh Ceylon tea and a delicious breakfast buffet.<br />
•	Train Ride: Experience the breathtaking train journey from Nuwara Eliya to Ella.<br />
•	Explore: Visit the Nine Arches Bridge and capture the beauty of this iconic structure.<br />
•	Adventure: Enjoy a thrilling zip-lining experience over the lush tea fields.<br />
•	Relaxation: Take a soothing bath in the natural pools of Diyaluma Falls.<br />
•	Refresh: Enjoy strawberries and fresh milkshakes.<br />
•	Explore: Walk through the hill country and visit Ella Gap and Mini Adam’s Peak.<br />
•	Dinner: Indulge in a hot and grand buffet dinner at your hotel.<br />
•	Overnight: Stay at your lovely hotel in Ella with breathtaking views of the mountains.<br /><br />
Highlights:<br />
•	Scenic Train Ride: Stunning views of the hill country.<br />
•	Nine Arches Bridge: Iconic colonial-era bridge surrounded by lush greenery.<br />
•	Zip-Lining: Thrilling adventure over tea plantations.<br />
•	Diyaluma Falls: Refreshing natural pools and serene environment.<br />
•	Ella Gap and Mini Adam’s Peak: Gorgeous landscapes and panoramic views.<br />
•	Local Experience: Explore the village and enjoy local delicacies.<br />
•	 Mountains<br /><br />


<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Ella.jpg" alt="" />
                  </p>
                  
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 10 - Thisa</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day7 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day7')}
                >
                  {additionalDescriptions.day7 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day7 && (
                  <div>
                    <h4>Explore the ancient wonders of Sigiriya and Anuradhapura.</h4>
                    <p>
                    The cultural heart of Sri Lanka, Kandy is surrounded by enchanting green nature and picturesque villages amidst tranquil landscapes. With breathtaking views of the famous Kandy Lake and home to the sacred relic of the Buddhist faith, Kandy is a must-visit destination. Explore the heritage of Sri Lanka’s last kingdom and take a stroll through the stunning Botanical Gardens, created by the British in the 19th century and still one of the most beautiful gardens in Asia. Walk the streets of Kandy, visit the local market, and enjoy performances of traditional Kandyan dances in the evening.
<br /><br />Activities:<br />
•	En route, visit Pinnawala Elephant Orphanage: Witness the care and conservation of elephants at this famous sanctuary.<br />
•	Check in at the beautiful hotel & refresh: Settle into your accommodation and refresh after your journey.<br />
•	Visit the famous Temple of the Tooth in Kandy: Explore one of the most sacred Buddhist sites in Sri Lanka.<br />
•	Enjoy a cultural dance in the evening: Experience the vibrant traditional Kandyan dances.<br />
•	Back to hotel for overnight stay: Relax and unwind in your comfortable hotel room.<br />
•	Enjoy your first Sri Lankan grand dinner buffet at the hotel: Savor a variety of local delicacies at the hotel buffet.<br />
•	Take a walk around the Kandy Lake at night: End your day with a peaceful stroll around the picturesque Kandy Lake.<br />
Enjoy your second day immersed in the cultural and historical richness of Kandy!<br />
<img style={photoStyle}  src="https://lahirutours.co.uk/photos/Thissa.jpg" alt="" />
                    </p>
                  </div>
                )}
              </div>




              <div style={additionalDescriptionStyle}>
                <p>Day 11 - Mirissa
                </p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day8 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day8')}
                >
                  {additionalDescriptions.day8 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day8 && (
                  <div>
                   <p>
                  Mirissa
Get ready for an adventurous day in Mirissa, the ultimate beach lover’s paradise in Sri Lanka! As you wake up to the soothing sounds of the waves and the gentle sea breeze, you’ll know that today is all about sun, sea, and excitement.<br />
<b>Activities: </b>
•	Wake Up to Paradise: Start your day by immersing yourself in the natural beauty of Mirissa. Enjoy a delightful Sri Lankan breakfast buffet at your hotel, savoring fresh local flavors and exotic fruits.<br />
•	Beach Bliss: Head to the golden sands of Mirissa Beach, where the turquoise waters invite you to dive in. Whether you’re a seasoned surfer or a casual beachgoer, the warm sea and soft sand are perfect for relaxation and fun.<br />
•	Check-In: Settle into your charming beachside hotel, where you can unwind and refresh after a day of activities.<br />
•	Underwater Adventure: Discover the wonders beneath the waves with an exhilarating snorkeling or scuba diving experience. Explore vibrant coral reefs and swim among exotic marine life in the clear, blue waters of Mirissa.<br />
•	Deep-Sea Fishing: Embark on a thrilling deep-sea fishing excursion with local fishermen. Try your hand at catching some of the ocean’s biggest fish while keeping an eye out for majestic whales and playful dolphins.<br />
•	Relaxation: After a day of adventure, indulge in a soothing herbal massage at one of the local spas. Let the calming aromas and expert hands melt away any remaining stress.<br />
•	Explore the Coast: Rent a bicycle and take a leisurely ride along Mirissa’s picturesque streets. Discover charming boutiques, artistic shops, and hidden gems along the coast.<br />
•	Sunset Spectacle: As evening approaches, find a cozy spot on the beach to enjoy the breathtaking sunset. Watch as the sky transforms into a canvas of colors, with the setting sun casting a golden glow over the ocean.<br />
•	Culinary Delight: Learn to prepare the famous Sri Lankan Crab Curry in a fun, hands-on cooking class. Then, feast on a sumptuous seafood dinner buffet, featuring a variety of fresh, flavorful dishes that showcase the best of Sri Lankan cuisine.<br />
•	Overnight Stay: Return to your beautiful beach hotel and relax under the stars, reflecting on a day filled with adventure and relaxation.<br />
<br /><br />
Highlights of Your Day in Mirissa: <br />
•	A delicious Sri Lankan breakfast buffet.<br />
•	Fun in the sun at Mirissa Beach.<br />
•	Exciting snorkeling or scuba diving adventures.<br />
•	Thrilling deep-sea fishing and whale watching.<br />
•	A relaxing herbal massage at a local spa.<br />
•	A scenic bike ride through Mirissa’s artistic streets.<br />
•	A memorable sunset experience by the beach.<br />
•	A delightful seafood dinner and cooking class.<br />
End of Day 8<br />
Prepare for another day of exploration or relaxation as you continue your unforgettable Sri Lankan adventure!<br /><br />

<img style={photoStyle} src="https://lahirutours.co.uk/photos/Mirissa.jpg" alt="" />
                  </p>
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 12 - Hikkaduwa
                </p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day9 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day9')}
                >
                  {additionalDescriptions.day9 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day9 && (
                  <div>
                    
                  <p> 
                  Hikkaduwa<br />

Hikkaduwa is a charming seaside resort town in southwestern Sri Lanka, renowned for its strong surf and stunning beaches. Palm-dotted Hikkaduwa Beach is lined with a variety of restaurants and bars, making it a lively spot for visitors. The shallow waters opposite the beach house the Hikkaduwa National Park, a coral sanctuary home to marine turtles and exotic fish. Inland, the Gangarama Maha Vihara, a Buddhist temple adorned with hand-painted murals, offers a serene cultural experience.

<br /><br />Activities:<br /><br />

•Enjoy the vibrant atmosphere of Hikkaduwa Beach<br />
•Explore the Hikkaduwa National Park to see coral reefs, marine turtles, and exotic fish<br />
•Visit the Gangarama Maha Vihara temple<br /><br /><br />
Galle<br /><br />

The next part of this exciting Sri Lanka tour package is a visit to Galle, a city that offers a perfect blend of culture and leisure. Known for its noteworthy attractions, Galle boasts cultural sites and picture-perfect beaches, the most famous being Unawatuna Beach. A visit to the Galle Fort is a must. This historical site offers numerous activities, including visiting the famous Galle Lighthouse and exploring the charming boutiques on Peddler Street. Your experience in Galle will be a delightful mix of culture and travel.

<br /><br />Activities:<br /><br />

•Stroll through the picturesque Unawatuna Beach<br />
•Explore the historic Galle Fort<br />
•Visit the iconic Galle Lighthouse<br />
•Browse the unique boutiques on Peddler Street<br />
<img style={photoStyle} src="https://lahirutours.co.uk/photos/Hikkaduwa.png" alt="" />
                  </p>
                  
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 13 & 14 - Bentota
                </p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day10 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day10')}
                >
                  {additionalDescriptions.day10 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day10 && (
                  <div>
                  <p>
                  <b>Bentota: A Tropical Paradise</b><br />
Welcome to Bentota, the jewel of Sri Lanka's southern coast and the ultimate destination for ocean enthusiasts! As part of our Sri Lanka holiday package, Bentota offers an idyllic blend of sun, sea, and adventure that promises to make your tropical dreams come true.
<br /><b>Morning:</b> <br />
•	Start your day with a refreshing cup of Ceylon tea as you gaze out at the Indian Ocean. <br />
•	Indulge in a hearty breakfast featuring the freshest seafood from the Indian Ocean.<br />
<b>Late Morning:</b><br />
•	Embark on a captivating boat ride through Madu River’s mangrove forests, enjoying the serene natural beauty and diverse wildlife.<br />
<b>Afternoon:</b><br />
•	Take a leisurely swim in the warm, inviting waters of the Indian Ocean.<br />
•	Relax on the beach, soaking up the sun and enjoying the tranquil seaside ambiance.<br />
<b>Evening:</b><br />
•	Don’t miss the breathtaking sunset over the horizon, a perfect end to your day in paradise.<br />
<b>End of Day:</b><br />
•	Relax at your beach hotel and prepare for the next leg of your Sri Lankan adventure.<br /><br />
<b>Highlights of Your Bentota Experience</b><br />
•	Explore the golden sands and crystal-clear waters of Bentota Beach.<br />
•	Engage in thrilling water sports at Madu River.<br />
•	Discover the traditional art of stilt fishing.<br />
•	Enjoy a seafood BBQ dinner on the beach.<br />
•	Witness the beauty of a sunset over the Indian Ocean.<br />
This day in Bentota offers a perfect blend of relaxation, adventure, and cultural experiences, making it a highlight of your Sri Lankan getaway.<br /><br /><br />
<img style={photoStyle} src="https://lahirutours.co.uk/photos/Bentota.jpg" alt="" />
                  </p>
                </div>
                )}
              </div>
              <div style={additionalDescriptionStyle}>
                <p>Day 15 - Colombo City</p>
                <button
                  style={{
                    ...arrowButtonStyle,
                    ...(additionalDescriptions.day11 ? arrowButtonHoveredStyle : {}),
                  }}
                  onClick={() => toggleAdditionalDescription('day11')}
                >
                  {additionalDescriptions.day11 ? '▲ Hide Details' : '▼ Show Details'}
                </button>
                {additionalDescriptions.day11 && (
                  <div>
                    
                    Proceed to the airport in time to connect with the departure flight.
                    
                  </div>
                  
                  
                )}
               
            
              </div>
              
            </div>
            
           <div>
            <Link to="/BookingForm" style={bookbuttonstyle2}> <b>Book Now</b></Link>
            </div>
        </section>
        
      </main>
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
          {isformvisible ? <FontAwesomeIcon  icon={faEnvelopeOpen} size="2x" /> : <FontAwesomeIcon  icon={faEnvelope} size="2x" />}<br /> Contact US
        </button>
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
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <label style={labelStyle}>Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
            required
          />
          <label style={labelStyle}>Subject:</label>
          <textarea
            id="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            style={inputStyle}
            required
          ></textarea>
          <label style={labelStyle}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
            required
          ></textarea>
          <button onClick={showAlert} type="submit" style={buttonStyle}>Inquiry</button>
        </form> 
      
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
            info@lahirutours.co.uk<br />
            admin@lahirutours.co.uk <br />
            payments@lahirutours.co.uk <br />
            </u>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Days15;
