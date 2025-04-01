import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import "./App.css";
import "./SearchBar.css";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer"; // Importa el Footer
import logo from "./assets/logo.jpg"; // Asegúrate de que la ruta sea correcta

const looksData = [
  { id: 1, name: "Look Casual", gender: "mujer", occasion: "Casual" },
  { id: 2, name: "Look Elegante", gender: "hombre", occasion: "Fiesta" },
  { id: 3, name: "Look Deportivo", gender: "mujer", occasion: "Deportivo" },
  { id: 4, name: "Look Formal", gender: "hombre", occasion: "Oficina" },
];

function App() {
  useEffect(() => { 
    ReactGA.initialize("G-Q4M0DEJL09");
    ReactGA.send("pageview");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Match My Look Logo" className="logo" />
        </div>
        <h1>
          Bienvenido a<br />
          Match My Look
        </h1>
        <h3 className="home-description">
          Descubre looks y haz match con tu estilo. <br />
        </h3>
      </header>

      <main>
        <Gallery />
      </main>

      {/* 👇 Agrega el Footer aquí */}
      <Footer />

    </div>
  );
}

export default App;




