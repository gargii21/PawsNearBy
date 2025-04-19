// import React, { useState,useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import RequestFormModal from "./RequestFormModal";
// import "../styles/ProfilePage.css";
// import axios from "axios";



// const ProfilePage = () => {
//   const [dname,setDname]=useState({daycare_name:"Paws and Claws",address:"Pune, India",email:"daycare@email.com",phone:"9876543210",service:"Pet Sitting",fees:"500",experience:"2 years",description:"Passionate about animal care and ensuring pets feel at home."})
//   const prId = useParams();
//   console.log(prId);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const showRequest = queryParams.get("request") === "true";
//   const [showForm, setShowForm] = useState(showRequest);
//   const service = queryParams.get("service");


//   // Dummy profile data
//   let profile = {
//     prId: prId,
//     //username: "caregiver_" + id,
//     daycare_name: "Happy Paws Boarding",
//     service: "Pet Sitting",
//     address: "Delhi",
//     fees: 500,
//     rating: 4.5,
//     email: "happypaws@example.com",
//     phone: "+91 9876543210",
//     about:
//       "Experienced caregiver who loves all pets! Available for boarding, walking, and sitting. Passionate about animal care and ensuring pets feel at home.",
//     experience: "3 years",
//     //requestsHandled: 42,
//     photo: "/images/pfp2.png",
//     banner: "/images/banner3.png",
//   };
  
  
//   useEffect(() => {
//     const fetchdata = async () => {
//       console.log("heereee")
//       try {
//         console.log("heereee2")
//         const response = await axios.post('http://localhost:5000/getPrInfo', {
//           id: prId.id,
//         },
//         {
//           withCredentials: true
//         }
//       );
//         console.log("heereee3")
//         const temp = response.data;
//         let list = [];
//         console.log(temp)

       
//         setDname({daycare_name:temp.daycare_name,address:temp.address,email:temp.email,phone:temp.phone,service:temp.service,fees:temp.fees,experience:temp.experience,description:temp.description})

//       } catch (error) {
//         console.log("Error fetching profiles. Backend might be down.");
       
//       } 
//     };

//     fetchdata();
//   }, []);

//   return (
//     <div className="profile-fullscreen">
//       <div className="profile-banner">
//         <img src={profile.banner} alt="Banner" />
//       </div>

//       <div className="profile-page-container">
//         <div className="profile-header">
//           <div className="profile-avatar">
//             <img src={profile.photo} alt={profile.daycare_name} />
//           </div>
//           <div className="profile-info">
//             <h2>{dname.daycare_name}</h2>
//             <p><strong>Location:</strong> {dname.address}</p>
//             <p><strong>Email:</strong> {dname.email}</p>
//             <p><strong>Phone:</strong> {dname.phone}</p>
//             <button onClick={() => setShowForm(true)}>Request</button>
//           </div>
//         </div>

//         <div className="profile-stats">
//           <div className="stat-box">
//             <h4>Service</h4>
//             <p>{dname.service}</p>
//           </div>
//           <div className="stat-box">
//             <h4>Fees</h4>
//             <p>₹{dname.fees}/hr</p>
//           </div>
//           <div className="stat-box">
//             <h4>Rating</h4>
//             <p>⭐ {profile.rating}</p>
//           </div>
//           <div className="stat-box">
//             <h4>Experience</h4>
//             <p>{dname.experience}</p>
//           </div>
//         </div>

//         <div className="bio">
//           <h3>About</h3>
//           <p>{dname.description}</p>
//         </div>

//         <div className="reviews-section">
//           <h3>Reviews</h3>
//           <div className="reviews-placeholder">
//             No reviews yet. Be the first to leave a review!
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <RequestFormModal
//           providerId={prId.id}
//           isOpen={showForm}
//           onClose={() => setShowForm(false)}
//           caregiverName={dname.daycare_name}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import RequestFormModal from "./RequestFormModal";
import "../styles/ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const [dname, setDname] = useState({
    daycare_name: "",
    address: "",
    email: "",
    phone: "",
    service: "",
    fees: "",
    experience: "",
    description: "",
  });
  const prId = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showRequest = queryParams.get("request") === "true";
  const [showForm, setShowForm] = useState(showRequest);

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getPrInfo', {
          id: prId.id,
        }, {
          withCredentials: true,
        });

        // Setting the fetched data to state
        const temp = response.data;
        setDname({
          daycare_name: temp.daycare_name,
          address: temp.address,
          email: temp.email,
          phone: temp.phone,
          service: temp.service,
          fees: temp.fees,
          experience: temp.experience,
          description: temp.description,
        });

      } catch (error) {
        console.log("Error fetching profiles. Backend might be down.");
      }
    };

    fetchdata();
  }, [prId.id]);

  return (
    <div className="profile-fullscreen">
      <div className="profile-banner">
        <img src='/images/default-banner.png' alt="Banner" />
      </div>

      <div className="profile-page-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src='/images/default-avatar.png' alt={dname.daycare_name} />
          </div>
          <div className="profile-info">
            <h2>{dname.daycare_name}</h2>
            <p><strong>Location:</strong> {dname.address}</p>
            <p><strong>Email:</strong> {dname.email}</p>
            <p><strong>Phone:</strong> {dname.phone}</p>
            <button onClick={() => setShowForm(true)}>Request</button>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <h4>Service</h4>
            <p>{dname.service}</p>
          </div>
          <div className="stat-box">
            <h4>Fees</h4>
            <p>₹{dname.fees}/hr</p>
          </div>
          <div className="stat-box">
            <h4>Rating</h4>
            <p>⭐ {dname.rating || "N/A"}</p>
          </div>
          <div className="stat-box">
            <h4>Experience</h4>
            <p>{dname.experience}</p>
          </div>
        </div>

        <div className="bio">
          <h3>About</h3>
          <p>{dname.description}</p>
        </div>

        <div className="reviews-section">
          <h3>Reviews</h3>
          <div className="reviews-placeholder">
            No reviews yet. Be the first to leave a review!
          </div>
        </div>
      </div>

      {showForm && (
        <RequestFormModal
          providerId={prId.id}
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          caregiverName={dname.daycare_name}
        />
      )}
    </div>
  );
};

export default ProfilePage;
