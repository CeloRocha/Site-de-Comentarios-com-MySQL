const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbpath = path.join(__dirname, 'database.js');
const db = require(dbpath);
db.conectar();



var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) =>{
  res.setHeader('Content-type', 'text/html');
  res.send('Online');
})

app.get('/carregar', (req,res) =>{
  res.setHeader('Content-type', 'application/javascript');
  db.carregarComentarios( (AllComments) => {
    res.send((AllComments));
  });
})

app.post('/enviar', (req,res) =>{
  
  res.setHeader('Content-type', 'application/javascript');
  db.adicionar_comentario(req.body.nome, req.body.comentario, (ops)=>{
    var volta = JSON.stringify(ops);
    res.send(volta);
  });
 
})


app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!');
});
