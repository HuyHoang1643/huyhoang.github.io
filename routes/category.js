var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
   var categories = await CategoryModel.find({});
   res.render('categories/index', { categories });
})

router.get('/add', (req, res) => {
   res.render('categories/add');
})

router.post('/add', async (req, res) => {
   var category = req.body;
   await CategoryModel.create(category);
   res.redirect('/category');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM mobiles WHERE brand = "id"
   var toys = await ToyModel.find({ category : id }).populate('category');
   res.render('categoris/detail', { toys })
})
router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   var categories = await CategoryModel.findById(id);
   await CategoryModel.deleteOne(brand);
   res.redirect('/category');
 })

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await BrandModel.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/category');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var categories = await CategoryModel.findById(id);
   res.render('categories/edit', { categories });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await CategoryModel.findByIdAndUpdate(id, category);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/category');
})

module.exports = router;