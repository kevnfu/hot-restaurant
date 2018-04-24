const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3000;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  // send index file
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/reserve', function(req, res) {
  res.sendFile(path.join(__dirname, 'reservation.html'));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, 'view.html'));
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
      res.json({"waitlist": true});
    } else {
      res.json({"waitlist": false});
    }
  });
  
});

app.listen(PORT, function() {
  console.log('App listening on PORT:', PORT);
})