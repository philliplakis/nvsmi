const smi = require('./smi');
const express = require("express");
const port = 8989;

var app = express();

// To access API from another System.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Send JSON output.
app.get("/api/nvsmi", function (req, res) {
    smi(function (err, smi) {
        if (err) {
            console.warn(err);
            process.exit(1);
        }
        res.json(smi)
    });
});

app.listen(port, function() {
    console.log("Server Availible at localhost:" + port + "/api/nvsmi");
});
