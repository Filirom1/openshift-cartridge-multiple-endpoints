# openshift-cartridge-multiple-endpoints

Use with http://cartreflect-claytondev.rhcloud.com/reflect?github=Filirom1/openshift-cartridge-multiple-endpoints

If your application is listening 2 different ports, here is a [nodejs example](https://github.com/Filirom1/openshift-cartridge-multiple-endpoints/blob/master/template/server.js) : 

    var http = require('http');
    
    // Default endpoint listen on OPENSHIFT_NODEJS_PORT
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('EndPoint 1\n');
    }).listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
    
    //endpoint2 listen on OPENSHIFT_NODEJS_PORT2
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('EndPoint 2\n');
    }).listen(process.env.OPENSHIFT_NODEJS_PORT2, process.env.OPENSHIFT_NODEJS_IP);
    
You will need to have define OPENSHIFT_NODEJS_PORT, OPENSHIFT_NODEJS_PORT2 in `manifest/metadata.yml` : 

    Cartridge-Short-Name: NODEJS
    Endpoints:
      - Private-IP-Name:   IP
        Private-Port-Name: PORT
        Private-Port:      8080
        Public-Port-Name:  PROXY_PORT
        Mappings:
          - Frontend:      ""
            Backend:       ""
            Options:       { websocket: true }
      - Private-IP-Name:   IP
        Private-Port-Name: PORT2
        Private-Port:      8090
        Public-Port-Name:  PROXY_PORT2
        Mappings:
          - Frontend:      "/endpoint2"
            Backend:       ""
            Options:       { }

https://github.com/Filirom1/openshift-cartridge-multiple-endpoints/blob/master/metadata/manifest.yml#L43

Note that the final environement variable name is composed of `OPENSHIFT_${Cartridge-Short-Name}_${Private-Port-Name}`

Also note that if you use websocket, you will have to do it on the root endpoint: https://lists.openshift.redhat.com/openshift-archives/users/2013-July/msg00015.html
