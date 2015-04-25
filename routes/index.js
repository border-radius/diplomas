var fs = require('fs');
var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Продажа дипломов по всей России' });
});

router.get('/delivery', function(req, res, next) {
  res.render('delivery', { title: 'Доставка и оплата. Продажа дипломов по всей России' });
});

router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Вопросы и ответы. Продажа дипломов по всей России' });
});

router.get('/contacts', function(req, res, next) {
  var city = geoip.lookup(req.ip);
  console.log(city);
  res.render('contacts', { title: 'Контакты. Продажа дипломов по всей России' });
});

router.get('/prices', function(req, res, next) {

  var prices = fs.readFileSync('data/items.json', { encoding: 'utf8' });
  
  prices = JSON.parse(prices);
  prices = prices.map(function (category) {
    category.items = category.items.map(function (item) {
      item.oldprice = (item.oldprice + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' руб.';
      item.price = (item.price + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' руб.';

      return item;
    });

    return category;
  });
  
  res.render('prices', { 
    title: 'Услуги. Продажа дипломов по всей России',
    prices: prices
  });

});

module.exports = router;
