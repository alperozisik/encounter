const express = require("express");
const app = express();
const path = require("path");
const port = parseInt(process.env.PORT || 8080);
const staticPath = path.resolve(__dirname, "../static");
const homePage = path.resolve(staticPath, "encounter.html");
const dataPath = path.resolve(__dirname, "../data/data.json");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.static(staticPath));
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(homePage));

app.get("/data", (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        let json = [];
        if (!err) {
            try {
                json = JSON.parse(data)
            } catch (ex) {}
        }
        res.status(200).json(json).end();
    })
});

app.post("/data", (req, res) => {
    fs.writeFile(dataPath, JSON.stringify(req.body, null, "\t"), "utf8", err => {
        if (!err)
            res.status(200).end();
        else
            res.status(500).json(err).end();
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));