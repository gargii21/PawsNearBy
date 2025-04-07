import React, { useState } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const user = {
    name: "priyal",
    role: "hybrid", // "owner" or "hybrid"
  };

  const [activePanel, setActivePanel] = useState("profile");

  const [sentRequests] = useState([
    {
      to: "Caregiver John",
      pet: "Buddy",
      service: "Boarding",
      date: "2025-04-10 to 2025-04-12",
      status: "Pending",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      location: "Mumbai",
      message: "Please take good care of Buddy!",
    },
  ]);

  const [receivedRequests, setReceivedRequests] = useState([
    {
      from: "Olivia",
      pet: "Milo",
      service: "Sitting",
      date: "2025-04-14 to 2025-04-15",
      status: "New",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      location: "Delhi",
      message: "Milo needs meds at 12pm.",
    },
    {
      from: "Emma",
      pet: "Charlie",
      service: "Boarding",
      date: "2025-04-20 to 2025-04-22",
      status: "New",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      location: "Pune",
      message: "Charlie is shy, please be gentle.",
    },
  ]);

  const [notifications] = useState([
    { text: "You have a new request from Olivia", time: "2h ago" },
    { text: "Your request to John was accepted!", time: "1d ago" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestAction = (index, action) => {
    const updated = [...receivedRequests];
    updated[index].status = action === "accept" ? "Accepted" : "Declined";
    setReceivedRequests(updated);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Hello, {user.name}</h2>
        <div className="sidebar-buttons">
          <button onClick={() => setActivePanel("profile")}>Profile</button>
          <button onClick={() => setActivePanel("requests")}>Requests</button>
          <button onClick={() => setActivePanel("notifications")}>Notifications</button>
        </div>
      </aside>

      <main className="panel-content">
        {activePanel === "profile" && (
          <div className="panel">
            <h2>Your Profile</h2>
            <p>Name: {user.name}</p>
            <p>Role: {user.role === "hybrid" ? "Pet Owner + Caregiver" : "Pet Owner"}</p>

            <div className="widgets-container">
              <div className="widget-card">
                <h3>Requests Sent</h3>
                <p>{sentRequests.length}</p>
              </div>

              {user.role === "hybrid" && (
                <div className="widget-card">
                  <h3>Requests Received</h3>
                  <p>{receivedRequests.length}</p>
                </div>
              )}

              <div className="widget-card">
                <h3>Unread Notifications</h3>
                <p>{notifications.length}</p>
              </div>
            </div>
          </div>
        )}

        {activePanel === "requests" && (
          <div className="panel">
            <h2>Requests</h2>

            <div className="request-section">
              <h3>Sent Requests</h3>
              {sentRequests.map((req, idx) => (
                <div key={idx} className="request-card sent">
                  <strong>To:</strong> {req.to} <br />
                  <strong>Pet:</strong> {req.pet} <br />
                  <strong>Service:</strong> {req.service} <br />
                  <strong>Date:</strong> {req.date} <br />
                  <strong>Status:</strong> {req.status} <br />
                  <button onClick={() => setSelectedRequest(req)}>View Details</button>
                </div>
              ))}
            </div>

            {user.role === "hybrid" && (
              <div className="request-section">
                <h3>Received Requests</h3>
                {receivedRequests.map((req, idx) => (
                  <div key={idx} className="request-card received">
                    <strong>From:</strong> {req.from} <br />
                    <strong>Pet:</strong> {req.pet} <br />
                    <strong>Service:</strong> {req.service} <br />
                    <strong>Date:</strong> {req.date} <br />
                    <strong>Status:</strong> {req.status} <br />
                    <button onClick={() => setSelectedRequest(req)}>View Details</button>
                    {req.status === "New" && (
                      <div className="request-actions">
                        <button onClick={() => handleRequestAction(idx, "accept")}>Accept</button>
                        <button onClick={() => handleRequestAction(idx, "decline")}>Decline</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePanel === "notifications" && (
          <div className="panel">
            <h2>Notifications</h2>
            {notifications.map((note, idx) => (
              <div key={idx} className="notification-card">
                <p>{note.text}</p>
                <small>{note.time}</small>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedRequest && (
  <div className="modal-overlay">
    <div className="modal-content view-modal">
      <h2>Request Details</h2>

      {selectedRequest.from && <p><strong>From:</strong> {selectedRequest.from}</p>}
      {selectedRequest.to && <p><strong>To:</strong> {selectedRequest.to}</p>}

      {/* Handle new pet details if in object form */}
      {typeof selectedRequest.pet === "object" ? (
        <>
          <p><strong>Pet Name:</strong> {selectedRequest.pet.name}</p>
          <p><strong>Pet Type:</strong> {selectedRequest.pet.type}</p>
          <p><strong>Pet Size:</strong> {selectedRequest.pet.size}</p>
          <p><strong>Pet Age:</strong> {selectedRequest.pet.age}</p>
        </>
      ) : (
        <p><strong>Pet:</strong> {selectedRequest.pet}</p>
      )}

      {/* Services */}
      {selectedRequest.services && (
        <p><strong>Services:</strong> {Array.isArray(selectedRequest.services)
          ? selectedRequest.services.join(", ")
          : selectedRequest.services}
        </p>
      )}

      {/* Date */}
      {selectedRequest.date && (
        typeof selectedRequest.date === "object" ? (
          <p><strong>Date:</strong> {selectedRequest.date.from} to {selectedRequest.date.to}</p>
        ) : (
          <p><strong>Date:</strong> {selectedRequest.date}</p>
        )
      )}

      {/* Time */}
      {selectedRequest.startTime && selectedRequest.endTime && (
        <p><strong>Time:</strong> {selectedRequest.startTime} - {selectedRequest.endTime}</p>
      )}
      {selectedRequest.time && (
        <p><strong>Time:</strong> {selectedRequest.time.start} - {selectedRequest.time.end}</p>
      )}

      {/* Location, Experience, Message */}
      {selectedRequest.location && <p><strong>Location:</strong> {selectedRequest.location}</p>}
      {selectedRequest.experience && <p><strong>Experience:</strong> {selectedRequest.experience} years</p>}
      {selectedRequest.message && <p><strong>Message:</strong> {selectedRequest.message}</p>}
      {selectedRequest.status && <p><strong>Status:</strong> {selectedRequest.status}</p>}

      <button className="close-btn" onClick={() => setSelectedRequest(null)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
