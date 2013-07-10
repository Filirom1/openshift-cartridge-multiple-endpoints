var http = require('http');

// Default endpoint listen on OPENSHIFT_NODEJS_PORT
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('<a href="/endpoint2">Endpoint 2</a>\n');
  res.write('Version: ' + JSON.stringify(process.versions, 0, 2)+ '\n');
  res.write('Env: ' + JSON.stringify(process.env, 0, 2)+ '\n');
  res.end('Hello World\n');
}).listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);

//endpoint2 listen on OPENSHIFT_NODEJS_PORT2
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('EndPoint 2\n');
}).listen(process.env.OPENSHIFT_NODEJS_PORT2, process.env.OPENSHIFT_NODEJS_IP);
