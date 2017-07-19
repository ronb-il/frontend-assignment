var express  = require('express');
var app = express();               
var morgan = require('morgan');            
var bodyParser = require('body-parser');
var fs = require('fs');
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());

// basic simple route
app.get('/api/dashboard', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.stringify(JSON.parse(data)));
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
console.log("App listening on port " + port);