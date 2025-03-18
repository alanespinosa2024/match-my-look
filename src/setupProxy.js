const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
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
      },
    })
  );
};


