const express = require('express');

const app = express();

let connections = [];

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.get('/message', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('TransferEncoding', 'chunked');
  connections.push(res);
});

let tick = 0

setInterval(() => {
  if(connections.length === 0) return;
  if(tick === 10) {
    connections.forEach((connection) => {
      connection.write('Goodbye\n');
      connection.end();
      tick = 0;
    });
    connections = [];
  }
  tick++;
  connections.forEach((connection, i) => {
    connection.write(`Hello ${i}, it's ${tick} tick\n`);
  });
}, 1000);

app.listen(3000, () => console.log("app running on 3000"));