const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(`Error at ${req.method} ${req.url} - Status: ${res.statusCode || 500}`);
  console.error(err.message, err);
  next(err);
});

// Início da aplicação
const port = process.env.PORT ?? 3006;
app.listen(port, () => {
  console.log(`Application started and listening on port ${port}`);
});

// Tratamento de término da aplicação
process.on('SIGINT', () => {
  console.log('Application is shutting down');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Application is shutting down');
  process.exit();
});
