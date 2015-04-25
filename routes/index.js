var fs = require('fs');
var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
  var map, city = geoip.lookup(req.ip);
  
  if (city && city.city && city.city === 'Saint Peterburg') {
    map = true;
  }

  res.render('contacts', { title: 'Контакты. Продажа дипломов по всей России', map: map });
});

router.get('/robots.txt', function (req, res, next) {
  res.send(fs.readFileSync('./robots.txt', { encoding: 'utf8' }));
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

router.post('/request', function (req, res, next) {
  var subject, config = fs.readFileSync('data/mail.json', { encoding: 'utf8' });
  config = JSON.parse(config);

  var text, transporter = nodemailer.createTransport(smtpTransport(config.smtp));

  if (req.body.phone) {
    subject = config.subjectPhone;
    text = [
      'Имя: ' + req.body.name,
      'Телефон: ' + req.body.phone
    ].join('\n');
  } else {
    subject = config.subjectMail;
    text = [
      'Имя: ' + req.body.name,
      'E-mail: ' + req.body.mail,
      '---',
      req.body.text
    ].join('\n');
  }

  transporter.sendMail({
    from: config.smtp.auth.user,
    to: config.to,
    subject: subject,
    text: text
  }, function (e, info) {
    if (e) {
      console.log(e);
      res.status(500);
    }

    res.send();
  });
});

module.exports = router;
