var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');

//URL: localhost:3001/mobile

router.get('/', async (req, res) => {
   var toys = await ToyModel.find({}).populate('brand');
   //Path: views/mobile/index.hbs
   res.render('toys/index', { toys });
})

router.get('/customer', async (req, res) => {
   var toys = await ToyModel.find({}).populate('brand');
   //Path: views/mobile/index.hbs
   res.render('toy/list', { toys });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('toys/add', { brands });
})

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   res.redirect('/toy');
})


router.get('/delete/:id', async (req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id);
   res.redirect('/Toy');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('toys/edit', { toy, brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   try {
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/toy');
})

router.get('/sort/asc', async (req, res) => {
   
   var toys = await ToyModel.find().populate('brand').sort({ model: 1 });
   res.render('toys/index', { toys })
})

router.get('/sort/desc', async (req, res) => {
   
   var toys = await ToyModel.find().populate('brand').sort({ model: -1 });
   res.render('toys/index', { toys })
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   
   var toys = await ToyModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('toys/index', { toys })
})

module.exports = router;