import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

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
    flexDirection: "column", // Coloca los íconos debajo del texto
    alignItems: "center", // Centra los íconos
    gap: "10px", // Ajusta el espacio entre los elementos
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    alignItems: "center", // Asegura que los íconos estén alineados
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
    gap: "15px", // Añadimos espacio entre los enlaces
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px", // Añadimos un margen entre los enlaces
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.socialIconsContainer}>
        <h3>Síguenos en redes sociales</h3>
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com/profile.php?id=61574852128584" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} style={styles.icon} />
          </a>
          <a href="https://www.instagram.com/matchmylook" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} style={styles.icon} />
          </a>
          <a href="https://x.com/matchmylook" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} style={styles.icon} />
          </a>
        </div>
      </div>

      <div style={styles.footerLinks}>
        <a href="/about" style={styles.footerLink}>Acerca de Nosotros</a>
        <a href="/privacy-policy" style={styles.footerLink}>Política de Privacidad</a>
        <a href="/faq" style={styles.footerLink}>FAQ</a>
        <a href="/contact" style={styles.footerLink}>Contacto</a>
      </div>
    </footer>
  );
};

export default Footer;


