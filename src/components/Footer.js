import React, { useState, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import AboutUs from "./Aboutus";           // Componente de Aboutus.js
import PrivacyPolicy from "./PrivacyPolicy"; // Componente de PrivacyPolicy.js
import FAQ from "./FAQ";                   // Componente de FAQ.js
import Contact from "./Contact";           // Componente de Contact.js
import "./Footer.css";
import "./Aboutus.css";
import "./PrivacyPolicy.css";

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
    marginTop: "20px",
  },
  socialIconsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    textDecoration: "none",
    transition: "transform 0.3s ease-in-out",
  },
  footerLinks: {
    marginTop: "10px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
    cursor: "pointer",
  },
};

const Footer = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Referencias para cada sección colapsable
  const aboutRef = useRef(null);
  const privacyRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  // Función para alternar la visibilidad de una sección
  const toggleSection = (section) => {
    setVisibleSection((prevSection) => (prevSection === section ? null : section));
  };

  // Efecto para hacer scroll a la sección visible
  useEffect(() => {
    if (visibleSection === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (visibleSection === "privacy" && privacyRef.current) {
      privacyRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (visibleSection === "faq" && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (visibleSection === "contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleSection]);

  return (
    <footer style={styles.footer}>
      <div style={styles.socialIconsContainer}>
        <h3>Síguenos en redes sociales</h3>
        <div style={styles.socialIcons}>
          <a
            href="https://www.facebook.com/profile.php?id=61574852128584"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} style={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/matchmylook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} style={styles.icon} />
          </a>
          <a
            href="https://x.com/matchmylook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} style={styles.icon} />
          </a>
        </div>
      </div>

      <div style={styles.footerLinks}>
        <a
          href="#"
          style={styles.footerLink}
          onClick={(e) => {
            e.preventDefault();
            toggleSection("about");
          }}
        >
          Acerca de Nosotros
        </a>
        <a
          href="#"
          style={styles.footerLink}
          onClick={(e) => {
            e.preventDefault();
            toggleSection("privacy");
          }}
        >
          Política de Privacidad
        </a>
        <a
          href="#"
          style={styles.footerLink}
          onClick={(e) => {
            e.preventDefault();
            toggleSection("faq");
          }}
        >
          FAQ
        </a>
        <a
          href="#"
          style={styles.footerLink}
          onClick={(e) => {
            e.preventDefault();
            toggleSection("contact");
          }}
        >
          Contacto
        </a>
      </div>

      {/* Renderizamos AboutUs solo si la sección "about" está activa y si no estamos en la ruta /about */}
      {visibleSection === "about" && location.pathname !== "/about" && (
        <div className="about-container" ref={aboutRef}>
          <AboutUs />
        </div>
      )}

      {/* Renderizamos PrivacyPolicy solo si la sección "privacy" está activa y si no estamos en la ruta /privacy-policy */}
      {visibleSection === "privacy" && location.pathname !== "/privacy-policy" && (
        <div className="privacy-container" ref={privacyRef}>
          <PrivacyPolicy />
        </div>
      )}

      {/* Renderizamos FAQ solo si la sección "faq" está activa y si no estamos en la ruta /faq */}
      {visibleSection === "faq" && location.pathname !== "/faq" && (
        <div className="faq-container" ref={faqRef}>
          <FAQ />
        </div>
      )}

      {/* Renderizamos Contact solo si la sección "contact" está activa y si no estamos en la ruta /contact */}
      {visibleSection === "contact" && location.pathname !== "/contact" && (
        <div className="contact-container" ref={contactRef}>
          <Contact />
        </div>
      )}
    </footer>
  );
};

export default Footer;
