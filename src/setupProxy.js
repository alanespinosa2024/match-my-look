const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // CORS (si es necesario)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite acceso desde cualquier origen
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  // Configura el proxy para redirigir las solicitudes a tu API backend
  app.use(
    '/wp-json',
    createProxyMiddleware({
      target: 'https://www.masdescuentos.mx',  // El servidor de destino
      changeOrigin: true,  // Cambiar el origen de la solicitud al de la URL de destino
      secure: false,  // Desactivar la verificación de SSL si es necesario (por ejemplo, si el servidor usa un certificado autofirmado)
      pathRewrite: {
        '^/wp-json': '/wp-json', // Redirigir las solicitudes a la ruta correcta en el backend
      },
    })
  );
};
