const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");




//Review or rating rout
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review rout
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;