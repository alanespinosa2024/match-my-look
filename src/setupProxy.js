const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
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
      },
    })
  );
};
