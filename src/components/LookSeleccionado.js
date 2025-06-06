import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    // Muestra todos los slugs disponibles en la API
    console.log("🔍 Slugs disponibles:");
    data.forEach((cat) => console.log(`Slug: ${cat.slug}, ID: ${cat.id}`));

    // Buscar la categoría exacta
    const category = data.find((cat) => cat.slug === slug);
    if (!category) {
      console.error(`❌ No se encontró la categoría con slug: ${slug}`);
    } else {
      console.log(`✅ ID encontrado para ${slug}: ${category.id}`);
    }
    return category ? category.id : null;
  } catch (error) {
    console.error("❌ Error al obtener el ID de la categoría:", error);
    return null;
  }
}

// Obtener productos por ID de categoría
async function fetchCategoryProductsById(categoryId) {
  console.log("🔍 Buscando productos para categoryId:", categoryId);  // Verificar el ID
  try {
    const response = await fetch(`${BASE_URL}/products?category=${categoryId}&per_page=10`, {
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

    const [loading, setLoading] = useState(false); // Estado para controlar la carga de productos
  

  // Mapeo de nombres de productos a URLs de categoría
  const staticCategoryMap = {
    // Productos de Look Mujer
    "Cardigans": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/cardigans-mujer/",
    "Blazer gris": "https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/sacos-mujer/",
    "Vestido corto": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-faldas/",
    "Blusa floral": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/blusas-y-camisas-mujer-ropa/",
    "mujer-ropa-tops": "https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-tops/",
    "Jeans": "https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-pantalones/",
    "Abrigo": 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-abrigos/',
    "Vestido": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-vestidos/',
    "Chamarra": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/chamarra/',
    "ropa deportiva": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-shorts/',
    "Shorts para mujer": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-ropa/mujer-ropa-bermudas-y-shorts/',
    "Sudadera Nike": 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/mujer-ropa-leggings/',
    "Zapatos formales": 'https://www.masdescuentos.mx/categoria/moda/mujer/mujer-calzado/zapatillas/',
    "Blusa": 'https://www.masdescuentos.mx/categoria/mujer/mujer-ropa/blusas-y-camisas-mujer-ropa/',

    // Productos de Look Hombre
    "Saco blanco": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/sacos-hombre-ropa/",
    "Camisa formal azul": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-chamarras-y-chalecos/",
    "Playera blanca": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/sacos-hombre-ropa/",
    "Pants Puma": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-sweaters-y-sudaderas/", // Añadido mapeo para pantalón de vestir
    "Tenis de running": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-calzado/hombre-calzado-tenis/running/",
    "Playera Puma para hombre": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-playeras-y-polos/",
    "Camisa estampada": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-ropa/hombre-ropa-camisas-casuales/",
    "Sudadera deportiva": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-sweaters-y-sudaderas/",
    "Saco para hombre": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/sacos-hombre-ropa/",
    "Chamarra para hombre": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-ropa/hombre-ropa-pantalones/",
    "Playera hombre": "https://www.masdescuentos.mx/categoria/hombre/hombre-calzado/hombre-calzado-botas-y-botines/",
    "Sacos hombre": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/sacos-hombre-ropa/",
    "Blazer azul": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-ropa/abrigos/",
    "Zapatillas": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-calzado/hombre-calzado-casuales/",
    "Sudadera": "https://www.masdescuentos.mx/categoria/hombre/hombre-ropa/hombre-ropa-pantalones/",
    "Jerseys": "https://www.masdescuentos.mx/categoria/moda/hombre/hombre-ropa/jerseys/",
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
    
    setProcessedCategories((prev) => [...prev, slug]);  
  
// Lógica ajustada para categorías de mujer y hombre
let categoryId;

if (slug.includes("hombre")) {  // Para categorías de hombre
  console.log("Slug de hombre detectado:", slug);

  const lookHombreIDs = {
    "sacos-hombre-ropa": 3926, // Look 1 Hombre
    "hombre-ropa-camisas-casuales": 2876, // Look 1 Hombre
    "hombre-ropa-chamarras": 2892, // Look 2 Hombre
    "hombre-ropa-sacos": 3926, // Look 4 Hombre
    "hombre-ropa-abrigos": 3793, // Look 5 Hombre
    "hombre-ropa-pantalones": 2915, // Look 6 Hombre
    "hombre-ropa-sweaters-y-sudaderas": 3112, // Look 7 Hombre
    "running": 6451, // Look 8 Hombre
    "hombre-ropa-playeras-y-polos": 2857, // Look 9 Hombre
    "hombre-ropa-sweaters-y-sudaderas": 3112, // Look 10 Hombre
    "sacos-hombre-ropa": 3926, // Look 10 Hombre
    "hombre-ropa-pantalones": 2915, // Look 10 Hombre
    "hombre-calzado-botas-y-botines": 2939,// Look 10 Hombre
    "jerseys": 7260, // Look 19 Hombre
    
  };

  categoryId = lookHombreIDs[slug] || await getCategoryIdBySlug(slug);

} else if (slug.includes("mujer")) {  // Para categorías de mujer
  console.log("Slug de mujer detectado:", slug);

  const lookMujerIDs = {
    "Cardigans": 5024, // Look 1 Mujer
    "Vestido": 3043, // Look 2 Mujer (Vestidos)
    "sacos-mujer": 3925, // Look 3 Mujer
    "mujer-ropa-faldas": 3051, // Look 3 Mujer
    "mujer-ropa-tops": 5029, // Look 4 Mujer
    "mujer-ropa-pantalones": 3035, // Look 17 Mujer
    "abrigos-mujer": 3325, // Look 5 Mujer
    "mujer-ropa-vestidos": 3043, // Look 6 Mujer
    "mujer-ropa-bermudas-y-shorts": 3107, // Look 7 Mujer
    "mujer-ropa-leggings": 3081, // Look 8 Mujer
    "blusas-y-camisas-mujer-ropa": 5387, // Look 7 Mujer
  };

  categoryId = lookMujerIDs[slug] || await getCategoryIdBySlug(slug);

} else {  
  // Para otros casos
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
      return [...prevProducts, ...uniqueProducts].slice(0, 8);
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
        } else {
          console.warn(`No se encontró URL para el producto: ${productName}`);
        }
      }
    }
  
    fetchCategories();
  }, [selectedLook]); // Dependencia en `selectedLook`, para que se ejecute cada vez que cambia el look
  

  // Configuración del carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
  };

  return (
    <div className="look-seleccionado">
      <h2>{selectedLook?.name}</h2>
  
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column', // Asegura que la imagen y el texto se apilen verticalmente
          marginBottom: '20px',
        }}
      >
        <img
          src={selectedLook?.imageUrl}
          alt={selectedLook?.name}
          width="300"
          style={{ marginBottom: '20px' }} // Añadido margen inferior para separar la imagen del texto
        />
        <p
          style={{
            maxWidth: '600px',
            flex: 1,
            marginTop: '10px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            textAlign: 'center',
          }}
        >
          {selectedLook?.description || "No hay descripción disponible."}
        </p>
      </div>
  
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
        <p>Buscando productos para ti....</p>
      )}
    </div>
  );  
  
};



export default LookSeleccionado;

