import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import "./App.css";
import "./SearchBar.css";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import About from "./components/Aboutus";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollHandler from "./components/ScrollHandler";
import logo from "./assets/logo.jpg";

const App = () => {
  const aboutRef = useRef(null);
  const privacyRef = useRef(null);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    document.title = "Match My Look";
    ReactGA.initialize("G-Q4M0DEJL09");
    ReactGA.send("pageview");
  }, []);

  useEffect(() => {
    if (location.pathname === "/about") {
      setActiveSection("about");
    } else if (location.pathname === "/privacy-policy") {
      setActiveSection("privacy");
    } else {
      setActiveSection(null);
    }
  }, [location]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Match My Look Logo" className="logo" />
        </div>
        <h1>Bienvenido a<br />Match My Look</h1>
        <h3 className="home-description">Descubre looks y haz match con tu estilo.</h3>
      </header>

      <main>
        <Gallery />
      </main>

      {/* 🔽 Footer con enlaces 🔽 */}
      <Footer />

      {/* 🔽 Sección de contenido dinámico (Aparece después del Footer) 🔽 */}
      <div ref={aboutRef}>
        {activeSection === "about" && <About />}
      </div>

      <div ref={privacyRef}>
        {activeSection === "privacy" && <PrivacyPolicy />}
      </div>

      <ScrollHandler aboutRef={aboutRef} privacyRef={privacyRef} />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);

export default WrappedApp;
