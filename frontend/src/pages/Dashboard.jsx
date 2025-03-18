import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/pets">My Pets</Link></li>
          <li><Link to="/dashboard/bookings">Bookings</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome to Your Dashboard! 🎉</h1>
        <p>Manage your pets, bookings, and community posts here.</p>

        {/* Placeholder for Pet Profiles */}
        <div className="pet-profiles">
          <h2>Your Pets 🐾</h2>
          <p>(Pet profiles will be displayed here, like Instagram posts!)</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
