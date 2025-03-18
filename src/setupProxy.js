// setupProxy.js
module.exports = function(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite acceso desde cualquier origen
    next();
  });

  app.set('host', '0.0.0.0'); // Asegúrate de que la app sea accesible desde cualquier IP
  app.set('port', 3000); // Establece el puerto
};


