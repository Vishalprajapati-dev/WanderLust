const User = require("../models/user");
const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  // delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};

module.exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  const bookings = await Booking.find({
    user: req.user._id,
  });

  const listings = await Listing.find({
    owner: req.user._id,
  });

  res.render("users/profile", {
    user,
    bookings,
    listings,
  });
};

module.exports.showDashboard = async (req, res) => {
  const listings = await Listing.find({
    owner: req.user._id,
  });

  const listingIds = listings.map((listing) => listing._id);

  const bookings = await Booking.find({
    listing: {
      $in: listingIds,
    },
  }).populate("listing");

  let revenue = 0;

  bookings.forEach((booking) => {
    const listing = listings.find((l) => l._id.equals(booking.listing._id));

    if (listing) {
      const nights = Math.ceil(
        (new Date(booking.checkOut) - new Date(booking.checkIn)) /
          (1000 * 60 * 60 * 24),
      );

      revenue += nights * listing.price;
    }
  });
  res.render("users/dashboard", {
    listings,
    bookings,
    revenue,
  });
};


module.exports.showHostProfile = async (req, res) => {

  const { id } = req.params;

  const host = await User.findById(id);

  const listings = await Listing.find({
    owner: id,
  });

  res.render("users/hostProfile", {
    host,
    listings,
  });
};