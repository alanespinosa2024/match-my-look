import React from "react";
import Gallery from "../components/Gallery";
import { looks } from "../data/looks"; // Importamos los datos desde looks.js

const Home = () => {
  const combinedLooks = [
    {
      category: "Mujer",
      items: looks.mujer, // Usamos los datos de looks.mujer
    },
    {
      category: "Hombre",
      items: looks.hombre, // Usamos los datos de looks.hombre
    },
  ];

  return (
    <div>
      
      
      
      <h2>¡Looks para tí!</h2>
      <Gallery looks={combinedLooks} /> {/* Pasamos los datos a Gallery */}
    </div>
  );
};

export default Home;




