var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Продажа дипломов по всей России' });
});

router.get('/prices', function(req, res, next) {

  var prices = fs.readFileSync('data/items.json', { encoding: 'utf8' });
  
  prices = JSON.parse(prices);
  prices = prices.map(function (category) {
    category.items = category.items.map(function (item) {
      item.oldprice += ' руб';
      item.price += ' руб';

      return item;
    });

    return category;
  });
  
  res.render('prices', { 
    title: 'Услуги',
    prices: prices
  });
});

module.exports = router;
