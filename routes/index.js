var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var ToyModel = require('../models/ToyModel');
/* GET home page. */
router.get('/', async (req, res) => {
  try {
    var toys = await ToyModel.find({}).populate('brand'); //cái này 1
    var brands = await BrandModel.find({});   //cái này nhiều
    res.render('customer/index', { brands,toys });
  } catch (error) {
    console.error('Error fetching toys:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/admin', function(req, res, next) {
  res.render('admin/index',{ layout: 'layoutadmin' });
});
module.exports = router;