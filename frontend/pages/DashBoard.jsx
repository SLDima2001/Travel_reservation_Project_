import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect guest users to sign-in page
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent UI from rendering before redirect

  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <p>This is your private dashboard.</p>
    </div>
  );
};

export default Dashboard;
