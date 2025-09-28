import React, { useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate} from "react-router-dom";
import { client } from "../../api/auth";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        await client();
      } catch (error) {
        console.error("Error fetching client:", error);
        navigate("/login"); // redirect if unauthorized
      }
    };
    fetchClient();
  }, [navigate]);
  return (
    <>
    
   <Navbar />
      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <h3>Quick Access</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
            <h4>Lost Items</h4>
            <p>View and manage lost items</p>
          </div>
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
            <h4>Found Items</h4>
            <p>View and manage found items</p>
          </div>
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
            <h4>Profile</h4>
            <p>Manage your account</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
