const url = "https://hackathon.ethfinex.com"
const BFX = require('bitfinex-api-node')
const bfx = new BFX({
  apiKey: 'Cz8fqbD7g4AwFoiIuIToCAi0YrLj9dwjmcA3CmXnsEn',
  apiSecret: '35fvXm2qKJrG8ARn8MN1EeVEn3BfXRqQ1kvRYNm6WSh',
  rest: {
    url: url
  }
});

const rest = bfx.rest(version = 1);
module.exports = rest;
