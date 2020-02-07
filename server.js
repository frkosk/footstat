const express = require('express');
const app = express();

const path = require('path');
const fileDir = path.join(__dirname, 'public');
const PORT = process.env.PORT || 5000;

/*
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        var secureUrl = "https://" + req.headers.host + req.url; 
        res.writeHead(301, { "Location":  secureUrl });
        res.end();
    }
});
*/

app.use('/', express.static(fileDir));

/* for catching 404 errors */
app.use((req, res) => {
    res.status(404).send('404 – Page not found');
})

/* for cathing all errors,
this is default error handler provided by express,
we will use this function to centralize all our errors
*/
app.use((err, req, res, next) => {
    res.status(500).send(`hey!! we caugth the error 👍👍, ${err.stack} `);
})

app.listen(PORT, () => console.log(`listening on port https://localhost:${PORT}`));