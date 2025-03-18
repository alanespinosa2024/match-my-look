const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://www.masdescuentos.mx',
      changeOrigin: true,
      secure: true
    })
  );
};
