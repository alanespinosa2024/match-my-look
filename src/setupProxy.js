module.exports = function (app) {
  app.set('host', '0.0.0.0'); // Permite que la app sea accesible desde cualquier IP
  app.set('port', 3000);      // Establece el puerto
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};
