const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('This is a test');
});

server.listen(port, hostname, () => {
  console.log("Server running on port: ${port}/");
});
