
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import ProfilePage from "./components/ProfilePage"; 
import BecomeCaregiver from "./pages/BecomeCaregiver";
import TermsConditions from "./pages/TermsConditions";
import "./styles/styles.css";


function App() {
  return (
    <Router basename="/PawsNearBy">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile/:id" element={<ProfilePage />} /> 
          <Route path="/become-caregiver" element={<BecomeCaregiver />} />
          <Route path="/termsandconditions" element={<TermsConditions />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
