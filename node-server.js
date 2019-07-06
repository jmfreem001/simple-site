const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  // Break the request object into a query object that can break query into elements
  const query = url.parse(req.url);
  let filename = `.${query.pathname}.html`;
  console.table(query);
  if (query.pathname === '/'){
    filename = './index.html';
  }
  console.log(`Filename ${filename}`);
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(err);
      //If file doesn't exist render the 404 page. 
      if (err.code === 'ENOENT'){
        console.log("THIS HAPPENED!")
        fs.readFile('404.html', (err, data) => {
          if (err) console.log(err);
          res.writeHead(404, { 'Content-Type': 'text/html'} );
          res.write(data);
          return res.end();
        });
      }
      res.writeHead(500, {'Content-Type': 'text/html'});
      return res.end();
    } 
    res.writeHead(200, { 'Content-Type': 'text/html'} );
    res.write(data);
    return res.end();
  });
}).listen(8080);

  