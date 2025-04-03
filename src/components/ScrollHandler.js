import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = ({ aboutRef, privacyRef }) => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (location.pathname === "/about") {
        aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (location.pathname === "/privacy-policy") {
        privacyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Pequeño delay para asegurar que el DOM se actualice
  }, [location, aboutRef, privacyRef]);

  return null; // No renderiza nada
};

export default ScrollHandler;
