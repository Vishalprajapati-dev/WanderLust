const Joi = require('joi');

module.exports.listingSchema = Joi.object({
 listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),

    category: Joi.string()
      .valid(
        "Beach",
        "Mountain",
        "City",
        "Camping",
        "Historical",
        "Tropical"
      )
      .required(),
      amenities: Joi.array().items(Joi.string()),
      houseRules: Joi.array().items(Joi.string()),

    image: Joi.object({
        filename: Joi.string().allow("", null),
        url: Joi.string().allow("", null)
    }).default({})
    
}).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});
