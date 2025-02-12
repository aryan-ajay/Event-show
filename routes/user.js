const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { savaRedierctUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.signupRenderForm)
.post(userController.signup);


router.route("/login")
.get(userController.loginRenderForm)
.post(savaRedierctUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.login));


router.get("/logout", userController.logout);


module.exports = router;