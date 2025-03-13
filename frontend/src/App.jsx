
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";  // Import Login Page
import Signup from "./pages/Signup"; // Import Signup Page
import Dashboard from "./pages/Dashboard"; 
import Community from "./pages/Community";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />  {/* Added Login Route */}
          <Route path="/signup" element={<Signup />} /> {/* Added Signup Route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

