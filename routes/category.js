const express = require('express')
const Categories = require('../models/category')
const { isUser } = require('./middlewares')
router = express.Router()

router.param('category', (req, res, next, id) => {
  Categories.findById(id, (err, category) => {
    if (err || !category) {
      console.log(category, id);
      res.status(404).json({ error: 'Category does not exist' });
      return;
    }
    req.category = category;
    next();
  });
});


router.post("/category/create", (req, res) => {
  const { name, description, photoUrl, subscriptions } = req.body
  if (!name || !description) {
    res.json({ err: "Incomplete details" })
  }
  Categories.create({ user: req.user._id ,name, description, subscriptions, photoUrl }, (err, category) => {
    res.json(category)
  })
})

router.post("/category/:category/edit", isUser(req.category.user), (req, res) => {
  const { name, description, photoUrl, subscriptions, id } = req.body
  Categories.findByIdAndUpdate(id, { name, description, subscriptions, photoUrl }, (err, category) => {
    res.json(category)
  })
})

res.post("/category/:category/delete", isUser(req.category.user), (req, res) => {
  Categories.findOneAndRemove(id, (err, categories) => {
    res.json(categories)
  })
})