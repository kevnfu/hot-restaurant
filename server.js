const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3000;

let app = express();

app.get('/', function(req, res) {
  // send index file
});

app.get('/reserve', function(req, res) {

});

app.get('/tables', function(req, res) {
  
});

app.get('/api/tables', function(req, res) {
  fs.readFile('data.js', 'utf8', function(err, data) {
    // return first 5
    res.json(JSON.parse(data).slice(0, 4));
  });
});

app.get('/api/waitlist', function(req, res) {
  fs.readFile('data.js', 'utf8', function(err, data) {
    // return all after 5
    res.json(JSON.parse(data).slice(5));
  });
});

app.use('/api/tables', bodyParser.json());

// add data
app.post('/api/tables', function(req, res) {
  let newTable = req.body;

  fs.readFile('data.js', 'utf8', function(err, data) {
    if(err) throw err;

    data = JSON.parse(data);
    data.push(newTable)

    fs.writeFile('data.js', JSON.stringify(data, null, 2), 'utf8', err => {
      if(err) throw err;
    });

    // reservation?
    if(data.length > 5) {
      res.json({"waitlist": false});
    } else {
      res.json({"waitlist": true});
    }
  });
  
});

app.listen(PORT, function() {
  console.log('App listening on PORT:', PORT);
})