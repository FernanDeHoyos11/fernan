const app = require('./production/server');

require('./app/routes/news')(app);

// starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
