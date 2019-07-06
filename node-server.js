const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  // Break the request object into a query object that can break query into elements
  const query = url.parse(req.url);
  let filename = '';
  if (query.pathname === '/') {
    filename = './index.html';
  } else if (query.pathname === '/contact-me' || query.pathname === '/about') {
    filename = `.${query.pathname}.html`;
  } else {
    filename = './404.html';
  }
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      console.log(err);
      return res.end('Error: Contact your system administrator.');
    } 
    res.writeHead(200, { 'Content-Type': 'text/html'} );
    res.write(data);
    return res.end();
  });
}).listen(8080);

  