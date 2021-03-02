const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const newPromise = new Promise((resolve, reject) => {
  fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body));
});

newPromise.then(()=>{
  console.log("anything")
})

app.post('/api/env', (req, res) => {
  res.send(req.body.post)
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
