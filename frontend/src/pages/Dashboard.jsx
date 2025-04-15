import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/dashboard.css";
import ViewRequestForm from "../components/ViewRequestForm";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activePanel, setActivePanel] = useState("profile");
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    age: "",
    size: "",
    notes: "",
  });
  const [sentRequests, setSentRequests] = useState([]);


  // const [sentRequests] = useState([
  //   {
  //     to: "Caregiver John",
  //     pets: [
  //       { petName: "Buddy", petType: "Dog", petAge: "2", petSize: "Medium", notes: "Friendly" },
  //       { petName: "Luna", petType: "Cat", petAge: "1", petSize: "Small", notes: "Playful and cuddly" },
  //     ],
  //     service: "Boarding",
  //     fromDate: "2025-04-10",
  //     toDate: "2025-04-12",
  //     startTime: "10:00 AM",
  //     endTime: "6:00 PM",
  //     location: "Mumbai",
  //     message: "Please take good care of Buddy and Luna!",
  //     status: "Pending",
  //   },
  // ]);

  const [receivedRequests, setReceivedRequests] = useState([]);

  const [notifications] = useState([
    { text: "You have a new request from Olivia", time: "2h ago" },
    { text: "Your request to John was accepted!", time: "1d ago" },
  ]);

  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);



  useEffect(() => {
    const fetchUserAndPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");
  
        const data = await res.json();
        const { name, isProvider, id } = data.user;
  
        // Now fetch pets using the same cookie
        const petRes = await fetch("http://localhost:5000/getPet", {
          method: "GET",
          credentials: "include",
        });
  
        const petData = await petRes.json();
  
        setUser({
          name,
          role: isProvider ? "hybrid" : "owner",
          pets: petData.pets || [],
        });

        if (isProvider) {
          const reqRes = await fetch("http://localhost:5000/getRequestsForProvider", {
            method: "POST",
            credentials: "include",
          });
        
          if (reqRes.ok) {
            const reqData = await reqRes.json();
            setReceivedRequests(reqData.requests || []);
          } else {
            console.error("Failed to fetch provider requests");
          }
        }
        
      } catch (err) {
        console.error("Failed to fetch user or pets:", err);
      }
    };
  
    fetchUserAndPets();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/getRequestsByOwner',
          {}, // no body
          { withCredentials: true }
        );
        
        setSentRequests(response.data.data || []);
        //setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        //setLoading(false);
      }
    };

    fetchRequests();
  }, []);
  

  const handleRequestAction = async (index, action, reqId) => {
    const newStatus = action === "accept" ? "Accepted" : "Rejected"; // Decline becomes Rejected

    try {
      const response = await axios.post(
        'http://localhost:5000/updateRequestStatus',
        { reqId, status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Update local UI after successful response
        const updated = [...receivedRequests];
        updated[index].status = newStatus; // Update status in the UI
        setReceivedRequests(updated);

        // Update status in sentRequests as well (if needed)
        const updatedSent = sentRequests.map(req => {
          if (req.reqId === reqId) {
            return { ...req, status: newStatus };
          }
          return req;
        });
        setSentRequests(updatedSent);
      }
    } catch (err) {
      console.error("Failed to update request status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleViewDetails = (reqId) => {
    setSelectedRequestId((prevId) => (prevId === reqId ? null : reqId));
  };
  

  const handleAddPet = async (e) => {
    e.preventDefault();
  
    const { name, type, age, size, notes } = newPet;
  
    if (!name || !type) return;
  
    try {
      const res = await fetch("http://localhost:5000/addPet", {
        method: "POST",
        credentials: "include", // so cookies (token) are sent
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type, age, size, notes }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed to add pet");
      }
  
      // Add new pet to local state after success
      setUser((prev) => ({
        ...prev,
        pets: [...prev.pets, data.data],
      }));
  
      // Reset form
      setNewPet({ name: "", type: "", age: "", size: "", notes: "" });
      setShowAddPetForm(false);
    } catch (err) {
      console.error("Error adding pet:", err.message);
      alert(err.message);
    }
  };
  

  if (!user) return <div className="dashboard"><p>Loading dashboard...</p></div>;


  //console.log("Request object:", req);
  //console.log("Request ID:", req.reqId);

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
          <div className="panel profile-panel">
            <h2>Your Profile</h2>
            <div className="profile-header">
              <img src="/images/pfp.png" alt="User Avatar" className="avatar" />
              <div className="user-info">
                <h2>Hello, {user.name}</h2>
                <span className={`role-badge ${user.role}`}>
                  {user.role === "hybrid" ? "Pet Owner + Caregiver" : "Pet Owner"}
                </span>
                <p className="bio">I love cats.</p>
              </div>
            </div>

            <div className="widgets-container">
              <div className="widget-card"><h3>Requests Sent</h3><p>{sentRequests.length}</p></div>
              {user.role === "hybrid" && (
                <div className="widget-card"><h3>Requests Received</h3><p>{receivedRequests.length}</p></div>
              )}
              <div className="widget-card"><h3>Unread Notifications</h3><p>{notifications.length}</p></div>
            </div>

            <div className="pets-section">
              <h3>Your Pets</h3>
              {user.pets.length ? (
                <div className="pet-cards">
                  {user.pets.map((pet, i) => (
                    <div key={i} className="pet-card">
                      <h4>{pet.name}</h4>
                      <p><strong>Type:</strong> {pet.type}</p>
                      <p><strong>Age:</strong> {pet.age}</p>
                      <p><strong>Size:</strong> {pet.size}</p>
                      <p><strong>Notes:</strong> {pet.notes}</p>
                    </div>
                  ))}
                </div>
              ) : <p>No pets added.</p>}

              <button className="add-pet-btn" onClick={() => setShowAddPetForm(!showAddPetForm)}>
                {showAddPetForm ? "Cancel" : "Add Pet"}
              </button>

              {showAddPetForm && (
                <div className="add-pet-form-container">
                  <form className="add-pet-form" onSubmit={handleAddPet}>
                    <label>Pet Name:<input type="text" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} /></label>
                    <label>Type:
                      <select value={newPet.type} onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}>
                        <option value="">Select Type</option><option value="Dog">Dog</option><option value="Cat">Cat</option>
                      </select>
                    </label>
                    <label>Age:<input type="number" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} /></label>
                    <label>Size:
                      <select value={newPet.size} onChange={(e) => setNewPet({ ...newPet, size: e.target.value })}>
                        <option value="">Select Size</option><option value="Small">Small</option><option value="Medium">Medium</option><option value="Large">Large</option>
                      </select>
                    </label>
                    <label>Notes:<textarea value={newPet.notes} onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })} rows="3" /></label>
                    <button type="submit">Save Pet</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

{activePanel === "requests" && (
  <div className="panel">
    <h2>Requests</h2>

    {/* Sent Requests */}
    <div className="request-section">
      <h3>Sent Requests</h3>
      {sentRequests && sentRequests.length > 0 ? (
  sentRequests.map((req, i) => (
    <div key={i} className="request-card sent">
      <strong>Pet:</strong> {req.pet?.name || 'N/A'} ({req.pet?.type || 'Unknown'}, Age {req.pet?.age || 'N/A'}, Size {req.pet?.size || 'N/A'}) <br />
      <strong>Service:</strong> {req.service || 'N/A'} <br />
      <strong>Date:</strong> {req.startDate ? new Date(req.startDate).toLocaleDateString() : 'N/A'} to {req.endDate ? new Date(req.endDate).toLocaleDateString() : 'N/A'} <br />
      <strong>Time:</strong> {req.startTime || 'N/A'} to {req.endTime || 'N/A'} <br />
      <strong>Status:</strong> {req.status || 'N/A'} <br />
      <button onClick={() => {
        setSelectedRequest(req);
        setSelectedRequestId(req.reqId);
      }}>
        View Details
      </button>
    </div>
  ))
) : (
  <p>No requests available.</p> // or any placeholder message when there are no requests
)}


    </div>

    {/* Received Requests */}
    {user.role === "hybrid" && (
      <div className="request-section">
        <h3>Received Requests</h3>
        {receivedRequests.map((req, i) => (
          <div key={i} className="request-card received">
            <strong>Service:</strong> {req.service} <br />
            <strong>Start Date:</strong> {new Date(req.startDate).toLocaleDateString()} <br />
            <strong>End Date:</strong> {new Date(req.endDate).toLocaleDateString()} <br />
            <strong>Start Time:</strong> {req.startTime} <br />
            <strong>End Time:</strong> {req.endTime} <br />
            <strong>Status:</strong> {req.status} <br />
            <button onClick={() => {
              setSelectedRequest(req);
              setSelectedRequestId(req.reqId);
            }}>
              View Details
            </button>
            {req?.status === "Pending" && req?.reqId && (
  <div className="request-actions">
    <button onClick={() => handleRequestAction(i, "accept", req.reqId)}>Accept</button>
    <button onClick={() => handleRequestAction(i, "decline", req.reqId)}>Decline</button>
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
            {notifications.map((n, i) => (
              <div key={i} className="notification-card">
                <p>{n.text}</p>
                <small>{n.time}</small>
              </div>
            ))}
          </div>
        )}
      </main>

      <ViewRequestForm
  isOpen={!!selectedRequest}
  onClose={() => {
    setSelectedRequest(null);
    setSelectedRequestId(null);
  }}
  request={selectedRequest}
/>
    </div>
  );
};

export default Dashboard;

