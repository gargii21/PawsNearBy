// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* Navbar appears on every page */}
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/search-results" element={<SearchResults />} />
//         </Routes>
//       </div>
//       <Footer /> {/* Footer appears on every page */}
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";  // Import Login Page
import Signup from "./pages/Signup"; // Import Signup Page

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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

