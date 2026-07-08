// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const ejs = require("ejs");
// const Listing  = require("./models/listing.js");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// const path = require("path");
// const { listingSchema, reviewSchema } = require("./schema.js");

// const reviewRouter = require("./routes/review.js");
// const listingRouter = require("./routes/listing.js");

// app.set("view engine" , "ejs");
// app.set("views" , path.join(__dirname, "views"));
// app.use(express.urlencoded({extended : true}));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));

// const port = 8080;

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main().then(()=>{
//    console.log("connected");
// })
// .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(MONGO_URL);

// };



// app.get("/", (req,res)=>{
//    res.send("Hi! i am Root.");
// });


// // index route //
// app.get("/listings" , wrapAsync(async (req,res) =>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs" ,{allListings});
// }));


// // // New Route //
// app.get("/listings/new" , async(req, res)=>{
//     res.render("listings/new.ejs");
// });


// // // show route //
// app.get("/listings/:id" , wrapAsync(async(req,res)=>{
//    let {id} = req.params;
//    const listing = await Listing.findById(id).populate("reviews");
//    res.render("listings/show.ejs" , {listing});
// }));

// // // create route //
// app.post("/listings",
//    wrapAsync(async (req,res,next) => {
//    const newListing = new Listing(req.body.listing);
//    await newListing.save();
//    res.redirect("/listings");
// })
// );

// // // Edit Route //
// app.get("/listings/:id/edit" , wrapAsync(async(req,res)=>{
//    let {id} = req.params;
//    const listing = await Listing.findById(id);
//    res.render("listings/edit.ejs" , {listing});

// }));

// //update  Route //

// app.put(
//   "/listings/:id",
//   // validateListing,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;

//     const updatedListing = await Listing.findByIdAndUpdate(
//       id,
//       { $set: req.body.listing },
//       { new: true, runValidators: true }
//     );

//     if (!updatedListing) {
//       throw new ExpressError(404, "Listing not found");
//     }

//     res.redirect(`/listings/${id}`);
//   })
// );


// // //DELETE ROUTE //
// app.delete("/listings/:id" , wrapAsync(async(req,res) =>{
//    let {id} = req.params;
//    let deletedId = await Listing.findByIdAndDelete(id);
//    console.log(deletedId);
//    res.redirect("/listings");
// }));



// // revies Route //

// app.use("/listings/:id/reviews", reviewRouter);

// // listing Route //

// app.use("/listings", listingRouter);



// app.use((req, res, next) => {
//     next(new ExpressError(404, "page not found"));
// });

// app.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { message });
// });

// app.listen(8080, () => console.log("app is listening on 8080"));















// After Refactoring with Routes and Modularization // ------------------------------------------------------------

if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const bookings = require("./routes/booking.js");
const paymentRoutes = require("./routes/payment.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(MONGO_URL).then(() => console.log("connected")).catch(console.error);

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie : {
    httpOnly : true,
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
  },
};


// ---- Routes ----
app.get("/", (req, res) => {
  res.redirect("/listings");
});


// Session and Flash Configuration //
app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration //
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.locals.razorpayKey = process.env.RAZORPAY_API_KEY;


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});


// Routes..

app.use("/listings", listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/listings/:id",bookings);
app.use("/", bookings);
app.use("/", user);
app.use("/payment", paymentRoutes);

// 404 + error handler
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs" , {message});
});

app.listen(8080, () => console.log("app is listening on 8080"));
