module.exports = function(app) {

    app.get('/', (req, res) => {
        res.send('Welcome to OSF Academy Backend Starter Kit. Have Fun!')
    });

    // You can add others app.use with other route files
    app.use(require('./category'))
    app.use(require('./productsCatalog'))

    
    // fallthrough error handler
    app.use(function onError(err, req, res, next) {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500;
      res.send(err.message).end(err + '\n');
    });
  }
  