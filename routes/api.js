var express = require('express');
var router = express.Router();
var reviewsDb = require('../db/reviews');
var checkValidKey = require('./middlewares/checkValidKey');

// Implement the routes.
router.get('/all', function (req, res, next) {
  reviewsDb.getAllReviews(function (error, reviews) {
    if (error) {
      next(error);
    } else {
      res.send(reviews);
    }
  });
});

router.get('/search/:className', function (req, res, next) {
  var className = req.params.className;
  reviewsDb.getReviewsByClassName(className, function (error, reviews) {
    if (error) {
      next(error);
    } else {
      res.send(reviews);
    }
  });
});

module.exports = router;
