import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { looks } from "../data/looks";
import "./gallery.css";
import LookSeleccionado from "./LookSeleccionado"; // Importar el componente

// Función para filtrar los looks por ocasión y término de búsqueda
const filterLooks = (looks, selectedOccasion, searchTerm) => {
  if (!looks) return [];

  const searchTermFormatted = searchTerm.trim().toLowerCase();

  return looks.filter((look) => {
    const occasionFormatted = look.occasion?.trim().toLowerCase();
    const selectedOccasionFormatted = selectedOccasion.trim().toLowerCase();

    const matchesOccasion =
      selectedOccasionFormatted === "todas" || occasionFormatted === selectedOccasionFormatted;

    const matchesSearch =
      searchTermFormatted === "" ||
      look.name.toLowerCase().includes(searchTermFormatted) ||
      occasionFormatted.includes(searchTermFormatted) ||
      (look.description && look.description.toLowerCase().includes(searchTermFormatted));

    return matchesOccasion && matchesSearch;
  });
};

// Componente para el carrusel de looks
const Carousel = ({
  looks,
  likes,
  handleLike,
  occasions,
  selectedOccasion,
  setSelectedOccasion,
  searchTerm,
  onImageClick, // Prop para manejar el clic en la imagen
}) => {
  const filteredLooks = filterLooks(looks, selectedOccasion, searchTerm);

  return (
    <div>
      <div className="occasion-filter">
        {occasions.map((occasion) => (
          <button
            key={occasion}
            onClick={() => setSelectedOccasion(occasion)}
            className={selectedOccasion === occasion ? "active" : ""}
          >
            {occasion}
          </button>
        ))}
      </div>

      <div className="looks-container">
        {filteredLooks.length === 0 ? (
          <p>No se encontraron looks para esta ocasión.</p>
        ) : (
          filteredLooks.map((look, index) => (
            <div key={look.id} className="look-item">
              <img
                src={look.imageUrl}
                alt={look.name}
                onClick={() => onImageClick(look)} // Maneja el clic en la imagen
              />
              <p>{look.name}</p>
              <p>Ocasión: {look.occasion}</p>
              <button
                className={likes[index] ? "liked" : ""}
                onClick={() => handleLike("mujer", index, look)} // Se pasa el look aquí
              >
                {likes[index] ? <FaHeart /> : <FaRegHeart />} Match
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Componente principal de la Galería
const Gallery = () => {
  // Crear una referencia para la sección de "Look seleccionado"
  const lookSeleccionadoRef = useRef(null);

  // Cargar los likes guardados desde localStorage
  const loadLikesFromLocalStorage = () => {
    const savedLikes = localStorage.getItem("likes");
    return savedLikes ? JSON.parse(savedLikes) : {
      mujer: Array(looks.mujer.length).fill(false),
      hombre: Array(looks.hombre.length).fill(false),
    };
  };

  // Estado para los likes y la ocasión seleccionada
  const [likes, setLikes] = useState(loadLikesFromLocalStorage());
  const [selectedOccasions, setSelectedOccasions] = useState({
    mujer: "Todas",
    hombre: "Todas",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLook, setSelectedLook] = useState(null); // Estado para la imagen seleccionada
  const occasions = ["Todas", "Fiesta", "Trabajo", "Casual", "Sport"];

  // Función para manejar el like de un look
  const handleLike = (category, index, look) => {
    const updatedLikes = { ...likes };
    updatedLikes[category][index] = !updatedLikes[category][index];
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    // Actualizar el look seleccionado
    setSelectedLook(look);

    // Desplazar la vista hacia la sección "Look seleccionado" cuando se hace clic en "Match"
    if (lookSeleccionadoRef.current) {
      lookSeleccionadoRef.current.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave
        block: "start", // Alinea al principio de la sección
      });
    }
  };

  // Cambiar la ocasión seleccionada
  const handleOccasionChange = (category, occasion) => {
    setSelectedOccasions((prev) => ({ ...prev, [category]: occasion }));
  };

  // Cambiar el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Manejar el clic en una imagen de look
  const handleImageClick = (look) => {
    setSelectedLook(look); // Actualiza el estado con el look seleccionado

    // Desplazar a la sección de "Look seleccionado"
    if (lookSeleccionadoRef.current) {
      lookSeleccionadoRef.current.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave
        block: "start", // Alinea al principio de la sección
      });
    }
  };

  // Resetear la ocasión seleccionada cuando se borra el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSelectedOccasions({
        mujer: "Todas",
        hombre: "Todas",
      });
    }
  }, [searchTerm]);

  // Obtener looks relacionados basados en la categoría y ocasión del look seleccionado
  const getRelatedItems = (selectedLook) => {
    if (!selectedLook) return [];

    // Obtener la categoría del look seleccionado
    const categoryLooks = looks[selectedLook.category] || [];

    return categoryLooks.filter((look) => {
      return look.occasion === selectedLook.occasion && look.id !== selectedLook.id;
    });
  };

  return (
    <div className="gallery">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar"
        />
      </div>

      <div className="carousel-section">
        <h3>Mujer</h3>
        <Carousel
          looks={looks.mujer}
          likes={likes.mujer || []}
          handleLike={handleLike}
          occasions={occasions}
          selectedOccasion={selectedOccasions.mujer}
          setSelectedOccasion={(occasion) => handleOccasionChange("mujer", occasion)}
          searchTerm={searchTerm}
          onImageClick={handleImageClick} // Pasamos la función de clic en imagen
        />
      </div>

      <div className="carousel-section">
        <h3>Hombre</h3>
        <Carousel
          looks={looks.hombre}
          likes={likes.hombre || []}
          handleLike={handleLike}
          occasions={occasions}
          selectedOccasion={selectedOccasions.hombre}
          setSelectedOccasion={(occasion) => handleOccasionChange("hombre", occasion)}
          searchTerm={searchTerm}
          onImageClick={handleImageClick} // Pasamos la función de clic en imagen
        />
      </div>

      <h3 ref={lookSeleccionadoRef}>Look seleccionado</h3>
      {/* Mostrar el componente LookSeleccionado con el look seleccionado */}
      {selectedLook && (
        <LookSeleccionado selectedLook={selectedLook} getRelatedItems={getRelatedItems} />
      )}
    </div>
  );
};

export default Gallery;
