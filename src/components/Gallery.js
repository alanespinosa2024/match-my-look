import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { looks } from "../data/looks";
import "./gallery.css";
import LookSeleccionado from "./LookSeleccionado";

// Función para filtrar los looks por ocasión y término de búsqueda
const filterLooks = (looks, selectedOccasion, searchTerm) => {
  if (!looks) return [];

  const searchTermFormatted = searchTerm.trim().toLowerCase();
  const selectedOccasionFormatted = selectedOccasion.trim().toLowerCase();

  return looks.filter((look) => {
    const occasionFormatted = look.occasion?.trim().toLowerCase();

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
  category,
  looks,
  likes,
  handleLike,
  occasions,
  selectedOccasion,
  onOccasionChange,
  searchTerm,
  onImageClick,
}) => {
  const filteredLooks = filterLooks(looks, selectedOccasion, searchTerm);

  return (
    <div className="carousel-section">
      <h3>{category}</h3>

      <div className="occasion-filter">
        {occasions.map((occasion) => (
          <button
            key={occasion}
            onClick={() => onOccasionChange(occasion)}
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
                onClick={() => onImageClick(look)}
              />
              <p>{look.name}</p>
              <p>Ocasión: {look.occasion}</p>
              <button
                className={likes[index] ? "liked" : ""}
                onClick={() => handleLike(category.toLowerCase(), index, look)}
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

const Gallery = () => {
  const lookSeleccionadoRef = useRef(null);

  const loadLikesFromLocalStorage = () => {
    const savedLikes = localStorage.getItem("likes");
    return savedLikes
      ? JSON.parse(savedLikes)
      : {
          mujer: Array(looks.mujer.length).fill(false),
          hombre: Array(looks.hombre.length).fill(false),
        };
  };

  const [likes, setLikes] = useState(loadLikesFromLocalStorage());
  const [selectedOccasions, setSelectedOccasions] = useState({
    mujer: "Todas",
    hombre: "Todas",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLook, setSelectedLook] = useState(null);

  const occasions = ["Todas", "Fiesta", "Trabajo", "Casual", "Sport"];

  const scrollToLookSeleccionado = () => {
    if (lookSeleccionadoRef.current) {
      lookSeleccionadoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLike = (category, index, look) => {
    const updatedLikes = { ...likes };
    updatedLikes[category][index] = !updatedLikes[category][index];
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setSelectedLook(look);
    scrollToLookSeleccionado();
  };

  const handleOccasionChange = (category, occasion) => {
    setSelectedOccasions((prev) => ({ ...prev, [category]: occasion }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageClick = (look) => {
    setSelectedLook(look);
    scrollToLookSeleccionado();
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSelectedOccasions({
        mujer: "Todas",
        hombre: "Todas",
      });
    }
  }, [searchTerm]);

  const getRelatedItems = (selectedLook) => {
    if (!selectedLook) return [];
    const categoryLooks = looks[selectedLook.category] || [];
    return categoryLooks.filter(
      (look) =>
        look.occasion === selectedLook.occasion && look.id !== selectedLook.id
    );
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

      {/* Carrusel para Mujer */}
      <Carousel
        category="Mujer"
        looks={looks.mujer}
        likes={likes.mujer || []}
        handleLike={handleLike}
        occasions={occasions}
        selectedOccasion={selectedOccasions.mujer}
        onOccasionChange={(occasion) => handleOccasionChange("mujer", occasion)}
        searchTerm={searchTerm}
        onImageClick={handleImageClick}
      />

      {/* Carrusel para Hombre */}
      <Carousel
        category="Hombre"
        looks={looks.hombre}
        likes={likes.hombre || []}
        handleLike={handleLike}
        occasions={occasions}
        selectedOccasion={selectedOccasions.hombre}
        onOccasionChange={(occasion) => handleOccasionChange("hombre", occasion)}
        searchTerm={searchTerm}
        onImageClick={handleImageClick}
      />

      {/* Look seleccionado */}
      <h3 ref={lookSeleccionadoRef}>Look seleccionado</h3>
      {selectedLook && (
        <LookSeleccionado
          selectedLook={selectedLook}
          getRelatedItems={getRelatedItems}
        />
      )}
    </div>
  );
};

export default Gallery;
