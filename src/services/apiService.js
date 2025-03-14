import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LookSeleccionado.css'; // Añadir los estilos específicos

// Configuración de Axios con las claves de la API
const api = axios.create({
  baseURL: `https://www.masdescuentos.mx/wp-json/wc/v3/products/`,
  headers: {
    'Authorization': 'Basic ' + btoa('ck_d1f69b84bded161bcadb7cdc5538f3a0f4cc93fd:cs_47a034d947e28dbc135f0b14539c358a802a233f'), // Reemplaza con tus claves reales
  },
});

// Función para obtener un producto específico
const getProduct = async (productId) => {
  try {
    const response = await api.get(productId);
    console.log('✅ Respuesta de la API para el producto:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener el producto:', error);
    return null;
  }
};

// Función para obtener productos de una categoría
const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`?category=${categoryId}&per_page=10`);
    console.log('✅ Productos de la categoría:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener productos de la categoría:', error);
    return [];
  }
};

const LookSeleccionado = () => {
  const [product, setProduct] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const productId = 281071; // El ID del producto específico que mencionaste

    // Obtener el producto y sus categorías
    const fetchProductData = async () => {
      const productData = await getProduct(productId);
      if (productData) {
        console.log('✅ Producto recibido:', JSON.stringify(productData, null, 2));

        // Buscar la primera categoría asociada al producto
        const firstCategoryId = productData.categories?.[0]?.id;
        setCategoryId(firstCategoryId);
        setProduct(productData);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="selected-look-container">
      {/* Mostrar el producto obtenido */}
      <div className="selected-look-details">
        {product && (
          <>
            <img src={product?.images?.[0]?.src || '/default-image.jpg'} alt={product?.name || 'Producto'} />
            <div className="selected-look-info">
              <h2>{product?.name || 'Producto sin nombre'}</h2>
              <p>{product?.description || 'Sin descripción'}</p>
              <p>Precio: {product?.price_html || 'Precio no disponible'}</p>
            </div>
          </>
        )}
      </div>

      {/* Mostrar el categoryId */}
      <div className="category-id">
        <h4>ID de la categoría del producto</h4>
        {categoryId ? (
          <p>El ID de la categoría es: {categoryId}</p>
        ) : (
          <p>❌ No se encontró un ID de categoría válido.</p>
        )}
      </div>
    </div>
  );
};

export default LookSeleccionado;

