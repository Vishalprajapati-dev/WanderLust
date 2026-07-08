const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// register route //
router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup));

// login route //
router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.login);

// profile route //
router.get(
  "/profile",
  userController.showProfile
);

// dashboard route //
router.get(
  "/dashboard",
  userController.showDashboard
);

// host profile route //
router.get(
  "/host/:id",
  wrapAsync(userController.showHostProfile)
);

// logout route //
router.get("/logout", userController.logout);


module.exports = router;