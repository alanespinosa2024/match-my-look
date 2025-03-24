const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
<<<<<<< HEAD
  // CORS (si es necesario)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite acceso desde cualquier origen
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Encabezados permitidos
    next();
  });

  // Configura el proxy para redirigir las solicitudes a tu API backend
  app.use(
    '/wp-json',
    createProxyMiddleware({
      target: 'https://www.masdescuentos.mx',  // El servidor de destino
      changeOrigin: true,
      secure: false,  // Desactivar verificación de seguridad SSL si es necesario
      pathRewrite: {
        '^/wp-json': '/wp-json', // Redirigir las solicitudes a la ruta correcta en el backend
=======
  // CORS configuration (if needed)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allows access from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
    next();
  });

  // Set up the proxy to forward requests to the API backend
  app.use(
    '/wp-json', 
    createProxyMiddleware({
      target: 'https://www.masdescuentos.mx',  // Your backend server
      changeOrigin: true,  // Changes the origin of the request to the target URL
      secure: false,  // Disable SSL verification if needed (e.g., if the API server uses a self-signed certificate)
      pathRewrite: {
        '^/wp-json': '/wp-json', // Rewrite the path, though it's not changing here
>>>>>>> 0f04baf37fa78677befe76245de4f5f194938a25
      },
    })
  );
};
<<<<<<< HEAD
=======


>>>>>>> 0f04baf37fa78677befe76245de4f5f194938a25
