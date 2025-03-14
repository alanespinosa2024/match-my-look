import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Necesitamos esto para hacer la redirección
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { looks } from "../data/looks"; // Asegúrate de tener los datos de looks
import RelatedProductsCarousel from "../components/RelatedProductsCarousel"; // Importamos el carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Objeto de productos relacionados por categoría y ocasión
const relatedProducts = {
  hombre: {
    Casual: [
      { id: 1, name: 'Saco Casual', url: 'https://www.masdescuentos.mx/producto1', imageUrl: 'url_de_imagen_1' },
      { id: 2, name: 'Pantalón Slim Fit', url: 'https://www.masdescuentos.mx/producto2', imageUrl: 'url_de_imagen_2' },
      { id: 3, name: 'Tenis Deportivo', url: 'https://www.masdescuentos.mx/producto3', imageUrl: 'url_de_imagen_3' },
      { id: 4, name: 'Zapatos Casual', url: 'https://www.masdescuentos.mx/producto4', imageUrl: 'url_de_imagen_4' },
    ],
    Trabajo: [
      { id: 5, name: 'Camisa de vestir', url: 'https://www.masdescuentos.mx/producto5', imageUrl: 'url_de_imagen_5' },
      { id: 6, name: 'Traje Ejecutivo', url: 'https://www.masdescuentos.mx/producto6', imageUrl: 'url_de_imagen_6' },
      { id: 7, name: 'Zapatos de vestir', url: 'https://www.masdescuentos.mx/producto7', imageUrl: 'url_de_imagen_7' },
    ],
  },
  mujer: {
    Casual: [
      { id: 8, name: 'Blusa Casual', url: 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/blusas-y-camisas-mujer-ropa/', imageUrl: 'url_de_imagen_8' },
      { id: 9, name: 'Jeans Entallados', url: 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-pantalones/', imageUrl: 'url_de_imagen_9' },
      { id: 10, name: 'Botines', url: 'https://www.masdescuentos.mx/categoria/mujer/mujer-calzado/mujer-calzado-botas-y-botines/', imageUrl: 'url_de_imagen_10' },
    ],
    Fiesta: [
      { id: 11, name: 'Vestido de Noche', url: 'https://www.masdescuentos.mx/producto11', imageUrl: 'url_de_imagen_11' },
      { id: 12, name: 'Tacones Altos', url: 'https://www.masdescuentos.mx/producto12', imageUrl: 'url_de_imagen_12' },
    ],
  },
};

const LookDescription = ({ match }) => {
  const [likes, setLikes] = useState(false);
  const history = useHistory(); // Usamos useHistory para redirigir
  const { category, id } = match.params; // Obtenemos la categoría y el id de la URL
  const looksByCategory = looks[category]; // Accedemos a los looks por categoría
  const look = looksByCategory ? looksByCategory.find((item) => item.id === parseInt(id)) : null;

  if (!look) {
    return <p>Look no encontrado.</p>;
  }

  // Función para manejar el like
  const handleLike = () => {
    setLikes(!likes);
  };

  // Artículos relacionados (usando los datos de relatedProducts)
  const relatedArticles = relatedProducts[category]?.[look.occasion] || [];

  return (
    <div className="look-description">
      <div className="look-header">
        <h2>{look.name}</h2>
        <button onClick={handleLike}>
          {likes ? <FaHeart /> : <FaRegHeart />} Me gusta
        </button>
      </div>

      <div className="look-main">
        <div className="look-image">
          <img src={look.imageUrl} alt={look.name} />
        </div>
        <div className="look-details">
          <p>{look.description}</p>
        </div>
      </div>

      {/* Integrar el componente de Carrusel de Artículos Relacionados */}
      <div className="related-articles">
        <h3>Artículos relacionados:</h3>
        {relatedArticles.length > 0 ? (
          <RelatedProductsCarousel products={relatedArticles} /> // Usamos el carrusel aquí
        ) : (
          <p>No hay productos relacionados disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default LookDescription;


