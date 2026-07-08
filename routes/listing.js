const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const Booking = require("../models/booking.js");

// index route and create route //
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.array("listing[images]", 10),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// new Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// wishlist route //
router.get("/wishlist", isLoggedIn, wrapAsync(listingController.showWishlist));

// add to wishlist route //
router.post(
  "/:id/wishlist",
  isLoggedIn,
  wrapAsync(listingController.addToWishlist),
);

router.post(
  "/:id/wishlist/remove",
  isLoggedIn,
  wrapAsync(listingController.removeFromWishlist),
);

// show route, update route, and delete route //
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("listing[images]", 10),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

// reservations route //
router.get(
  "/:id/reservations",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    const bookings = await Booking.find({
      listing: listing._id,
    }).populate("user");

    let revenue = 0;

    let upcomingBookings = 0;

    let completedBookings = 0;

    const today = new Date();

    bookings.forEach((booking) => {
      const nights = Math.ceil(
        (new Date(booking.checkOut) - new Date(booking.checkIn)) /
          (1000 * 60 * 60 * 24),
      );

      revenue += nights * listing.price;

      if (new Date(booking.checkOut) < today) {
        completedBookings++;
      } else {
        upcomingBookings++;
      }
    });

    res.render("listings/reservations.ejs", {
      listing,
      bookings,
      revenue,
      upcomingBookings,
      completedBookings,
    });
  }),
);

module.exports = router;
