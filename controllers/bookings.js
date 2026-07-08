const Booking = require("../models/booking");

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const existingBooking = await Booking.findOne({
    listing: id,

    $or: [
      {
        checkIn: {
          $lte: req.body.checkOut,
        },

        checkOut: {
          $gte: req.body.checkIn,
        },
      },
    ],
  });
  if (existingBooking) {
    req.flash("error", "These dates are already booked!");

    return res.redirect(`/listings/${id}`);
  }

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    guests: req.body.guests,
    totalPrice: req.body.totalPrice,
    paymentStatus: "paid",
  });

  await booking.save();

  const populatedBooking = await Booking.findById(booking._id).populate(
    "listing",
  );

  res.render("users/confirmation", {
    booking: populatedBooking,
  });
};

module.exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  await Booking.findByIdAndDelete(bookingId);

  req.flash("success", "Booking Cancelled Successfully!");

  res.redirect("/trips");
};

module.exports.showTrips = async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id,
  }).populate("listing");

  const validBookings = bookings.filter((booking) => booking.listing);
  console.log(validBookings);
  const today = new Date();

  validBookings.forEach((booking) => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    if (today < checkIn) {
      booking.status = "Upcoming";
    } else if (today >= checkIn && today <= checkOut) {
      booking.status = "Ongoing";
    } else {
      booking.status = "Completed";
    }
  });

  res.render("users/trips", {
    bookings: validBookings,
  });
};
