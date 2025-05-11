import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt from "jwt-decode"; // Import as namespace instead

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authentication check using JWT
    const token = localStorage.getItem("token");
    
    if (!token) {
      // No token found, redirect to login
      navigate("/adminsignin");
      return;
    }

    try {
      // Verify and decode the token
      const decoded = jwt.jwtDecode(token);
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("token");
        navigate("/adminsignin");
        return;
      }
      
      // Check if user has admin role
      if (!decoded.isAdmin) {
        // User is not an admin
        navigate("/unauthorized");
        return;
      }
      
      // Valid admin user
      setUser(decoded);
    } catch (error) {
      // Invalid token
      localStorage.removeItem("token");
      navigate("/adminsignin");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminsignin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return null; // Prevent UI from rendering before redirect

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      background: "linear-gradient(to right, #1e3c72, #2a5298)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      background: "#222",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    sidebarItem: {
      padding: "15px",
      margin: "10px 0",
      background: "#444",
      cursor: "pointer",
      borderRadius: "5px",
      textAlign: "center",
      fontSize: '20px',
      transition: "background 0.3s ease",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      textAlign: "center",
      animation: "fadeIn 0.8s ease-in-out",
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "30px",
      height: 'auto',
      width: 'auto',
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={{ fontSize: '25px' }}>Admin Panel</h3>
        <div
          style={styles.sidebarItem}
          onClick={() => navigate("/admindashboard")}
          onMouseEnter={(e) => (e.target.style.background = "#666")}
          onMouseLeave={(e) => (e.target.style.background = "#444")}
        >
          Dashboard
        </div>
        <div
          style={styles.sidebarItem}
          onClick={() => navigate("/usershowpage")}
          onMouseEnter={(e) => (e.target.style.background = "#666")}
          onMouseLeave={(e) => (e.target.style.background = "#444")}
        >
          Users
        </div>
        
        <div
          style={styles.sidebarItem}
          onClick={handleLogout}
          onMouseEnter={(e) => (e.target.style.background = "#666")}
          onMouseLeave={(e) => (e.target.style.background = "#444")}
        >
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <br></br>
      <h3 style={{ fontSize: '35px' }}>Welcome, {user.email}!</h3>
<p style={{ fontSize: '25px' }}>This is your admin dashboard.</p>
<br></br>

        {/* Cards Section */}
        <div
  style={{
    ...styles.cardContainer,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px', // adjust spacing between cards
  }}
>
  <div
    style={styles.card}
    onClick={() => navigate("/ShowContactus")}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    
    <h3 style={{ fontSize: '30px' }}>Contact Us Details</h3>
  </div>
  <div
    style={styles.card}
    onClick={() => navigate("/ShowFeedback")}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    <h3 style={{ fontSize: '30px' }}>Feedback Details</h3>
  </div>
  <div
    style={styles.card}
    onClick={() => navigate("/paymentdetails")}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    <h3 style={{ fontSize: '30px' }}>Payment Details</h3>
  </div>
  <div
    style={styles.card}
    onClick={() => navigate("/creatediscount")}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    <h3 style={{ fontSize: '30px' }}>Special Offers and Deals</h3>
  </div>
</div>

      </div>
    </div>
  );
};

export default AdminDashboard;