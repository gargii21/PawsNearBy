import React, { useState } from "react";
import "../styles/dashboard.css";
import ViewRequestForm from "../components/ViewRequestForm";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "priyal",
    role: "hybrid",
    pets: [
      {
        name: "Mochi",
        type: "Cat",
        age: 2,
        size: "Small",
        notes: "Loves climbing and hiding in bags.",
      },
      {
        name: "Rocky",
        type: "Dog",
        age: 4,
        size: "Large",
        notes: "Needs walks twice a day.",
      },
    ],
  });

  const [activePanel, setActivePanel] = useState("profile");
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    age: "",
    size: "",
    notes: "",
  });

  const [sentRequests] = useState([

    {
      to: "Caregiver John",
      pets: [
        { petName: "Buddy", petType: "Dog", petAge: "2", petSize: "Medium", notes: "Friendly" },
        { petName: "Luna", petType: "Cat", petAge: "1", petSize: "Small", notes: "Playful and cuddly" },
      ],
      service: "Boarding",
      fromDate: "2025-04-10",
      toDate: "2025-04-12",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      location: "Mumbai",
      message: "Please take good care of Buddy and Luna!",
      status: "Pending",
    }, 
]);
  const [receivedRequests, setReceivedRequests] =useState([
    {
      from: "Olivia",
      pets: [
        { petName: "Milo", petType: "Cat", petAge: "3", petSize: "Small", notes: "Needs meds at 12pm" },
      ],
      service: "Sitting",
      fromDate: "2025-04-14",
      toDate: "2025-04-15",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      location: "Delhi",
      message: "Milo needs meds at 12pm.",
      status: "New",
    },
    {
      from: "Emma",
      pets: [
        { petName: "Charlie", petType: "Dog", petAge: "4", petSize: "Large", notes: "Shy and gentle" },
      ],
      service: "Boarding",
      fromDate: "2025-04-20",
      toDate: "2025-04-22",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      location: "Pune",
      message: "Charlie is shy, please be gentle.",
      status: "New",
    },
  ]);

  const [notifications] = useState([
    { text: "You have a new request from Olivia", time: "2h ago" },
    { text: "Your request to John was accepted!", time: "1d ago" },
  ]);
 

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleRequestAction = (index, action) => {
    const updated = [...receivedRequests];
    updated[index].status = action === "accept" ? "Accepted" : "Declined";
    setReceivedRequests(updated);
  };

  const handleViewDetails = (req) => {
    setSelectedRequest(req);
    setDetailsModalOpen(true);
  };

  const handleAddPet = () => {
    if (!newPet.name || !newPet.type) return;
    setUser((prev) => ({
      ...prev,
      pets: [...prev.pets, newPet],
    }));
    setNewPet({ name: "", type: "", age: "", size: "", notes: "" });
    setShowAddPetForm(false);
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
          <div className="panel profile-panel">
            <h2>Your Profile</h2>
            <div className="profile-header">
              <img src="/images/pfp.png" alt="User Avatar" className="avatar" />
              <div className="user-info">
                <h3>{user.name}</h3>
                <span className={`role-badge ${user.role}`}>
                  {user.role === "hybrid" ? "Pet Owner + Caregiver" : "Pet Owner"}
                </span>
                <p className="bio">I love cats.</p>
              </div>
            </div>

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

            <div className="pets-section">
              <h3>Your Pets</h3>
              {user.pets?.length > 0 ? (
                <div className="pet-cards">
                  {user.pets.map((pet, index) => (
                    <div className="pet-card" key={index}>
                      <h4>{pet.name}</h4>
                      <p><strong>Type:</strong> {pet.type}</p>
                      <p><strong>Age:</strong> {pet.age}</p>
                      <p><strong>Size:</strong> {pet.size}</p>
                      <p><strong>Notes:</strong> {pet.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pets added.</p>
              )}

              <button className="add-pet-btn" onClick={() => setShowAddPetForm(!showAddPetForm)}>
                {showAddPetForm ? "Cancel" : "Add Pet"}
              </button>

              {showAddPetForm && (
  <div className="add-pet-form-container">
    <form className="add-pet-form" onSubmit={handleAddPet}>
      <label>
        Pet Name:
        <input
          type="text"
          placeholder="e.g. Mochi"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        />
      </label>

      <label>
        Type:
        <select
          value={newPet.type}
          onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
      </label>

      <label>
        Age:
        <input
          type="number"
          placeholder="e.g. 3"
          value={newPet.age}
          onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
        />
      </label>

      <label>
        Size:
        <select
          value={newPet.size}
          onChange={(e) => setNewPet({ ...newPet, size: e.target.value })}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>

      <label>
        Notes:
        <textarea
          placeholder="Loves squeaky toys, scared of thunder..."
          value={newPet.notes}
          onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
          rows="3"
        />
      </label>

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

            <div className="request-section">
              <h3>Sent Requests</h3>
              {sentRequests.map((req, idx) => (
                <div key={idx} className="request-card sent">
                  <strong>To:</strong> {req.to} <br />
                  <strong>Service:</strong> {req.service} <br />
                  <strong>Date:</strong> {req.fromDate} to {req.toDate} <br />
                  <strong>Status:</strong> {req.status} <br />
                  <button onClick={() => handleViewDetails(req)}>View Details</button>
                </div>
              ))}
            </div>

            {user.role === "hybrid" && (
              <div className="request-section">
                <h3>Received Requests</h3>
                {receivedRequests.map((req, idx) => (
                  <div key={idx} className="request-card received">
                    <strong>From:</strong> {req.from} <br />
                    <strong>Service:</strong> {req.service} <br />
                    <strong>Date:</strong> {req.fromDate} to {req.toDate} <br />
                    <strong>Status:</strong> {req.status} <br />
                    <button onClick={() => handleViewDetails(req)}>View Details</button>
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

      <ViewRequestForm
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
      />
    </div>
  );
};

export default Dashboard;
