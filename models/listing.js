const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: [
{
    url: String,
    filename: String,
}
],
  price: Number,
  location: String,
  country: String,
  houseRules: {
    type: [String],
    default: []
},
  category: {
    type: String,
    enum: ["Beach", "Mountain", "City", "Camping", "Historical", "Tropical"],
    default: "City",
  },
  amenities: [
    {
      type: String,
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  guests: {
    type: Number,
    default: 4,
  },

  bedrooms: {
    type: Number,
    default: 2,
  },

  bathrooms: {
    type: Number,
    default: 1,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.virtual("averageRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) {
    return null;
  }

  const total = this.reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  return (total / this.reviews.length).toFixed(1);
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
