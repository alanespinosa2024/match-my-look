import React from "react";
import "./App.css";
import "./SearchBar.css";
import Gallery from "./components/Gallery"; // Importar Gallery para mostrar los resultados

// Datos simulados para los looks
const looksData = [
  { id: 1, name: "Look Casual", gender: "mujer", occasion: "Casual" },
  { id: 2, name: "Look Elegante", gender: "hombre", occasion: "Fiesta" },
  { id: 3, name: "Look Deportivo", gender: "mujer", occasion: "Deportivo" },
  { id: 4, name: "Look Formal", gender: "hombre", occasion: "Oficina" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Bienvenido a<br />
          Match My Look
        </h1>
        <h3 className="home-description">
          Descubre looks y haz match con tu estilo. <br />
        </h3>
      </header>

      {/* Mostrar los resultados en la galería */}
      <main>
        <Gallery /> {/* Gallery maneja la búsqueda y los filtros */}
      </main>
    </div>
  );
}

export default App;






