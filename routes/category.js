const express = require('express')
const Categories = require('../models/category')
const { adminCategory } = require('./middlewares')
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

router.get("/:category", adminCategory, (req, res) => {
  res.json(res.category)
})

router.post("/create", (req, res) => {
  const { name, description, photoUrl, subscriptions } = req.body
  console.log(req.body)
  if (!name || !description) {
    return res.json({ err: "Incomplete details" })
  }
  Categories.create({ user: req.user._id ,name, description, subscriptions, photoUrl }, (err, category) => {
    res.json(category)
  })
})

router.post("/:category/edit", adminCategory, (req, res) => {
  const { name, description, photoUrl, subscriptions, id } = req.body
  Categories.findByIdAndUpdate(id, { name, description, subscriptions, photoUrl }, (err, category) => {
    res.json(category)
  })
})

router.post("/:category/delete", adminCategory, (req, res) => {
  Categories.findOneAndRemove(id, (err, categories) => {
    res.json(categories)
  })
})

module.exports = router