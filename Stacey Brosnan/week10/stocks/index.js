const express = require('express');
const ejs = require('ejs');
const _ = require('underscore');
const axios = require('axios');
const si = require('stock-info');
const stocks = ['AMZN', 'NFLIX'];



const server = express();

server.use(express.static('public'));
server.set('view-engine', ejs)

const PORT = 1337;

server.get('/', (req, res) =>{
  res.render('home.ejs');
});

server.get('/answer', (req, res) =>{
  const query = req.query.company;
  //not sure why query doesn't work


  //stocks prints in terminal but not on page
  si.getStocksInfo(stocks).then((result) => {
    console.log(result);
    res.render('answer.ejs', { company: req.query.company, price: result.regularMarketPreviousClose } );
  });

});


server.listen(PORT, () => console.log(`Now serving on http://localhost:${PORT}/`))
