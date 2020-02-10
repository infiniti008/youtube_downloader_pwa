var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
app.use(bodyParser.json().)
app.use(cors());


app.listen(6009, () => {
    console.log("server runed on 6009 port");
});

app.post('/', (req, res) => {
    console.log(req.body)
    fs.writeFileSync('info.json', JSON.stringify(req.body));
});