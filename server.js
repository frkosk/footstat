const static = require('node-static');
const path = require('path');
const fileServer = new static.Server(path.join(__dirname, 'public'));
const PORT = process.env.PORT || 5000

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file
                console.error("Error serving " + request.url + " - " + err.message);

                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));