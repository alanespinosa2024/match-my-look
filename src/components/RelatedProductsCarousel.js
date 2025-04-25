import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RelatedProductCarousel.css';

// Claves de WooCommerce (Usa variables de entorno en producción)
const API_KEY = "ck_d1f69b84bded161bcadb7cdc5538f3a0f4cc93fd";
const API_SECRET = "cs_47a034d947e28dbc135f0b14539c358a802a233f";
const BASE_URL = "https://www.masdescuentos.mx/wp-json/wc/v3";

// Obtener ID de categoría por slug
async function getCategoryIdBySlug(slug) {
  try {
    const url = `${BASE_URL}/products/categories?per_page=100`;
    const response = await fetch(url, {
      headers: {
        "Authorization": "Basic " + btoa(`${API_KEY}:${API_SECRET}`),
      },
    });
    const data = await response.json();
    
    if (!Array.isArray(data)) return null;
    
    // Muestra todos los slugs disponibles en la respuesta
    data.forEach((cat) => console.log(`Slug: ${cat.slug}, ID: ${cat.id}`));

    const category = data.find((cat) => cat.slug === slug);
    if (!category) {
      console.error(`No se encontró la categoría con slug: ${slug}`);
    }
    return category ? category.id : null;
  } catch (error) {
    console.error("Error al obtener el ID de la categoría:", error);
    return null;
  }
}

// Obtener productos por ID de categoría
async function fetchCategoryProductsById(categoryId) {
  console.log("🔍 Buscando productos para categoryId:", categoryId);  // Verificar el ID
  try {
    const response = await fetch(`${BASE_URL}/products?category=${categoryId}&per_page=5`, {
      headers: {
        "Authorization": "Basic " + btoa(`${API_KEY}:${API_SECRET}`),
      },
    });
    const data = await response.json();
    console.log("📦 Productos obtenidos:", data); // Verificar si llega la respuesta correcta
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
}

// Componente LookSeleccionado
const LookSeleccionado = ({ selectedLook }) => {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [processedCategories, setProcessedCategories] = useState([]);

  // Mapeo de nombres de productos a URLs de categoría
  const staticCategoryMap = {
    // Productos de Look Mujer
    "Vestido rojo": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-vestidos/",
    "Vestido rojo": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/",
    "Tacones altos": "https://www.masdescuentos.mx/categoria/mujer/mujer-zapatos/tacones/",
    "Bolso de noche": "https://www.masdescuentos.mx/categoria/mujer/mujer-accesorios/bolsos/",
    "Blazer gris": "https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/sacos/", // Actualizado para Blazer gris
    "Pantalones formales": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-pantalones/",
    "Blusa Casual": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/blusas-y-camisas-mujer-ropa/",
    "Jeans Entallados" : "https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-pantalones/",
    "Botines": 'https://www.masdescuentos.mx/categoria/mujer/mujer-calzado/mujer-calzado-botas-y-botines/',
    "Camisa blanca": 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/blusas-y-camisas-mujer-ropa/',
    "Falda lápiz": 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-faldas/',
    "Zapatos formales": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-calzado/zapatillas/',


    // Productos de Look Hombre
    "Camisa casual": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-camisas-casuales/",
    "Pantalón de mezclilla": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-pantalones/",
    "Zapatos de vestir": "https://www.masdescuentos.mx/categoria/hombre/hombre-calzado/hombre-calzado-casuales/",
    "Camisa negra": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-camisas-casuales/",
    "Pantalón de vestir": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-pantalones/", // Añadido mapeo para pantalón de vestir
  };

  // Obtener URL de categoría
  function getCategoryUrl(productName) {
    return staticCategoryMap[productName] || null;
  }

  // Obtener productos de la categoría
  async function fetchCategoryProducts(categoryUrl) {
    if (!categoryUrl) return;
  
    const parts = categoryUrl.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    console.log("Slug extraído:", slug);
  
    if (processedCategories.includes(slug)) {
      console.log(`Categoría "${slug}" ya procesada. Omitiendo...`);
      return;
    }
  
    setProcessedCategories((prev) => [...prev, slug]);
  
    // Lógica ajustada para categorías de mujer y hombre
    let categoryId;

    if (slug.includes("hombre")) {  // Ajuste primero para detectar categorías de hombre
      console.log("Slug de hombre detectado:", slug); // Depuración
      // Asignamos el ID fijo para categorías de hombre
      categoryId = 2851;  
      console.log("categoryId para hombre:", categoryId);  // Depuración
    } else if (slug === "mujer-ropa") {  // Luego, detecta categorías específicas de mujer
      categoryId = 3034; // id fijo para esta categoría de mujer
    } else {
      categoryId = await getCategoryIdBySlug(slug);
    }

    console.log("categoryId asignado:", categoryId); // Verificación de categoryId asignado

    if (!categoryId) {
      console.error("No se encontró un ID de categoría para el slug:", slug);
      return;
    }

    const products = await fetchCategoryProductsById(categoryId);
    console.log("Productos encontrados:", products); // Verificación de productos

    if (!products.length) {
      console.warn("No se encontraron productos.");
      return;
    }

    // Evitar productos duplicados y limitar a 8
    setCarouselProducts((prevProducts) => {
      const uniqueProducts = products.filter(
        (product) => !prevProducts.some((p) => p.id === product.id)
      );
      console.log("📦 Estado actualizado con productos:", uniqueProducts);
      return [...prevProducts, ...uniqueProducts].slice(0, 2);
    }); 
  }

  // Obtener productos de la categoría del primer producto relacionado
  useEffect(() => {
    async function fetchCategories() {
      if (!selectedLook?.relatedProducts?.length) return;
  
      // Limpiar los productos previos del carrusel cada vez que cambie el look seleccionado
      setCarouselProducts([]);
  
      console.log("selectedLook:", selectedLook);
  
      for (let productName of selectedLook.relatedProducts) {
        const categoryUrl = getCategoryUrl(productName);
        if (categoryUrl) {
          console.log("Consultando productos para la categoría:", categoryUrl);
          await fetchCategoryProducts(categoryUrl); // Trae los nuevos productos
          break; // Solo obtener productos de la primera categoría válida
        } else {
          console.warn(`No se encontró URL para el producto: ${productName}`);
        }
      }
    }
  
    fetchCategories();
  }, [selectedLook]); // Dependencia en `selectedLook`, para que se ejecute cada vez que cambia el look
  
  // Configuración del carrusel con barra de desplazamiento y sin puntos
  const sliderSettings = {
    dots: true,  // Desactivar los puntos
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,  // Añadir las flechas de navegación
  };

  return (
    <div className="look-seleccionado">
      <h2>{selectedLook?.name}</h2>
      <img src={selectedLook?.imageUrl} alt={selectedLook?.name} width="300" />

      <h3>Productos en la Categoría:</h3>
      {carouselProducts.length > 0 ? (
        <div className="related-products-carousel">
          <Slider {...sliderSettings}>
            {carouselProducts.map((product) => (
              <div key={product.id} className="related-product">
                <img
                  src={product.images?.[0]?.src || '/default-image.jpg'}
                  alt={product.name}
                  width="150"
                />
                <p>{product.name}</p>
                <a
                  href={product.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver producto
                </a>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>No hay productos relacionados disponibles.</p>
      )}
    </div>
  );
};

export default LookSeleccionado;
