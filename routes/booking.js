const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");

const bookingController =
require("../controllers/bookings");

router.post(
    "/book",
    isLoggedIn,
    wrapAsync(
        bookingController.createBooking
    )
);

router.delete(
    "/bookings/:bookingId",
    isLoggedIn,
    wrapAsync(
        bookingController.deleteBooking
    )
);

router.get(
    "/trips",
    isLoggedIn,
    wrapAsync(
        bookingController.showTrips
    )
);


module.exports = router;