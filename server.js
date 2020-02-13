const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();

const path = require('path');
const fileDir = path.join(__dirname, 'public');
const PORT = process.env.PORT || 5000;

function redirectWWW(req, res, next) {
    let host = req.headers.host;
    if (host.match(/^www\..*/i)) {
        return res.redirect(301, "https://" + host + req.url);
    }
    next();
}

// enable ssl redirect
// app.use(sslRedirect(['production'], 301));

// redirect to non-www
app.use(redirectWWW);

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