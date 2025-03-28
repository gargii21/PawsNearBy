import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userType, setUserType] = useState("owner"); // Change based on login role

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings"); // Replace with your actual API
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAction = async (bookingId, action) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify({ status: action }),
        headers: { "Content-Type": "application/json" },
      });
      fetchBookings(); // Refresh bookings after action
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/bookings">Bookings</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome to Your Dashboard! 🎉</h1>
        <p>Manage your pets, bookings, and community posts here.</p>

        {/* Bookings Section */}
        <div className="bookings-section">
          <h2>Your Bookings 📅</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Status:</strong> {booking.status}</p>

                {userType === "caregiver" && booking.status === "Pending" && (
                  <div className="action-buttons">
                    <button onClick={() => handleAction(booking.id, "Accepted")}>Accept</button>
                    <button onClick={() => handleAction(booking.id, "Rejected")}>Reject</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
