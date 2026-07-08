const Listing = require("../models/listing");
const axios = require("axios");
const User = require("../models/user");
const Booking = require("../models/booking");

module.exports.index = async (req, res) => {
  let filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.search) {
    filter.$or = [
      {
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      },

      {
        location: {
          $regex: req.query.search,
          $options: "i",
        },
      },

      {
        country: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  let allListings = await Listing.find(filter).populate("reviews");

  res.render("listings/index", {
    allListings,
    listingsData: JSON.stringify(allListings),
    search: req.query.search || "",
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log("Listing Title:", listing.title);
  console.log("Geometry:", listing.geometry);
  console.log("Coordinates:", listing.geometry?.coordinates);
  let isWishlisted = false;

  if (req.user) {
    const user = await User.findById(req.user._id);

    isWishlisted = user.wishlist.includes(listing._id);
  }
  console.log("Reviews:", listing.reviews);
  console.log("Average Rating:", listing.averageRating);
  const bookings = await Booking.find({
    listing: listing._id,
  });
  const hostListings = await Listing.countDocuments({
    owner: listing.owner._id,
  });

  const hostReviews = listing.reviews.length;

  const bookedDates = [];

  bookings.forEach((booking) => {
    let current = new Date(booking.checkIn);

    while (current <= booking.checkOut) {
      bookedDates.push(current.toISOString().split("T")[0]);

      current.setDate(current.getDate() + 1);
    }
  });
  let similarListings = await Listing.find({
  category: listing.category,
  _id: { $ne: listing._id },
}).limit(4);

similarListings = similarListings.filter((item) => {
  return (
    (item.images && item.images.length > 0) ||
    item.image
  );
});
  res.render("listings/show", {
    listing,
    isWishlisted,
    bookedDates,
    hostListings,
    hostReviews,
    similarListings,
  });
};

module.exports.removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      wishlist: id,
    },
  });

  req.flash("success", "Removed from wishlist");

  res.redirect(`/listings/${id}`);
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  // Build location string
  const locationQuery = `${newListing.location}, ${newListing.country}`;
  // console.log("LOCATION QUERY:");
  // console.log(locationQuery);

  // Get coordinates from Nominatim
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: locationQuery,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "WanderLust-App",
      },
    },
  );
  // console.log("NOMINATIM RESPONSE:");
  // console.log(response.data);
  if (response.data.length > 0) {
    const place = response.data[0];

    newListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
    };
    console.log(newListing.geometry);
  }

  newListing.owner = req.user._id;

  newListing.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));

  await newListing.save();
  // console.log("SAVING GEOMETRY:");
  // console.log(newListing.geometry);

  req.flash("success", "Listing created successfully!");

  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.images?.[0]?.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300"); // Resize image to width of 300px
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let updatedListing = await Listing.findById(id);

  // Update normal fields
  Object.assign(updatedListing, req.body.listing);

  // Update coordinates from location + country
  const locationQuery = `${updatedListing.location}, ${updatedListing.country}`;

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: locationQuery,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "WanderLust-App",
      },
    },
  );

  if (response.data.length > 0) {
    const place = response.data[0];

    updatedListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
    };
  }

  // Update image if new image uploaded
  if (req.files && req.files.length > 0) {
    updatedListing.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
  }

  await updatedListing.save();

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};

module.exports.addToWishlist = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(id)) {
    user.wishlist.push(id);
    await user.save();
  }

  req.flash("success", "Listing saved to wishlist ❤️");

  res.redirect(`/listings/${id}`);
};

module.exports.showWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  res.render("users/wishlist", {
    wishlist: user.wishlist,
  });
};
