import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";  // Import Home page
import Footer from "./components/Footer";
import "./styles/styles.css"; 

function App() {
  return (
    <>
      <Navbar />
      <Home />  {/* Loads the homepage */}
      <Footer />
    </>
  );
}

export default App;
