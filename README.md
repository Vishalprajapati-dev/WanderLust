# 🌍 WanderLust – Full-Stack Travel Booking Platform

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Template-B4CA65)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap\&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment%20Gateway-02042B)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript\&logoColor=black)

---

# ✨ Overview

**WanderLust** is a modern, production-ready full-stack travel booking platform inspired by Airbnb. It allows users to explore destinations, discover unique stays, create and manage property listings, book accommodations, make secure online payments, save favorite properties, and share reviews through a clean, responsive, and user-friendly interface.

Built using **Node.js, Express.js, MongoDB, EJS, Bootstrap, Cloudinary, Passport.js, and Razorpay**, the application follows the **MVC (Model–View–Controller)** architecture and RESTful principles to deliver a scalable, secure, and maintainable web application.

---

# 🚀 Key Features

### 🔐 Authentication & Security

* Secure User Registration & Login
* Passport.js Authentication
* Session Management
* Authorization & Protected Routes
* Flash Messages
* Password Encryption
* Input Validation using Joi
* Centralized Error Handling

### 🏡 Property Listings

* Create New Listings
* Edit Existing Listings
* Delete Listings
* Property Details Page
* Upload Multiple Images
* Cloudinary Image Storage
* Responsive Listing Cards

### 📅 Booking System

* Book Available Properties
* Booking Confirmation
* Reservation Management
* Booking History
* My Trips Section

### 💳 Razorpay Payment Gateway

* Secure Online Payments
* Booking Payment Integration
* Payment Verification
* Smooth Checkout Experience

### ❤️ Wishlist

* Save Favourite Properties
* Remove from Wishlist
* Personalized Wishlist Page

### ⭐ Reviews & Ratings

* Add Reviews
* Rating System
* Delete Reviews
* User Feedback Management

### 🗺️ Maps & Search

* Interactive Maps
* Location-Based Search
* Property Search
* Responsive Search Experience

### 👤 User Dashboard

* User Profile
* Host Dashboard
* My Listings
* My Trips
* Booking History
* Account Management

### 📱 Responsive UI

* Mobile Friendly
* Tablet Friendly
* Desktop Optimized
* Clean & Modern Design

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Bootstrap 5
* EJS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* Passport.js
* Express Session
* Connect Flash

## Cloud Services

* Cloudinary

## Payment Gateway

* Razorpay

## Validation

* Joi

## Version Control

* Git
* GitHub

---

# 🏗️ Project Architecture

The application follows the **MVC (Model–View–Controller)** architecture.

```text
WanderLust/
│
├── controllers/
├── models/
├── routes/
├── views/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
├── init/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Vishalprajapati-dev/WanderLust.git
```

## 2️⃣ Navigate to the Project Folder

```bash
cd WanderLust
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Create a `.env` File

Create a `.env` file in the root directory and add:

```env
MONGO_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

SESSION_SECRET=your_session_secret

MAP_API_KEY=your_map_api_key
```

## 5️⃣ Run the Application

```bash
npm start
```

Open your browser:

```text
http://localhost:3000
```

---

# 📸 Project Preview

> Replace these placeholders with your own screenshots after uploading them.

* 🏠 Home Page
* 🔍 Property Search
* 🏡 Listing Details
* ❤️ Wishlist
* 📅 Booking Page
* 💳 Razorpay Checkout
* 👤 User Dashboard
* 🏘️ Host Dashboard
* ⭐ Reviews & Ratings
* 📱 Mobile Responsive View

---

# 🎯 Core Functionalities

* ✔ User Authentication
* ✔ Authorization
* ✔ Property Management
* ✔ Image Upload with Cloudinary
* ✔ Wishlist Management
* ✔ Booking System
* ✔ Razorpay Payment Integration
* ✔ Reviews & Ratings
* ✔ Interactive Maps
* ✔ Search Functionality
* ✔ Responsive Design
* ✔ RESTful APIs
* ✔ MVC Architecture
* ✔ Error Handling
* ✔ Session Management

---

# 🔮 Future Enhancements

* AI-based Property Recommendations
* Google OAuth Login
* Email Notifications
* Booking Cancellation & Refunds
* Admin Dashboard
* Analytics & Reports
* Multi-language Support
* Advanced Property Filters
* Real-Time Chat Between Users & Hosts
* Property Availability Calendar

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork this repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 👨‍💻 Author

**Vishal Prajapati**

**GitHub**
https://github.com/Vishalprajapati-dev

**LinkedIn**
https://www.linkedin.com/in/vishal-prajapati-0b08b2224

---

# ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub. It motivates me to build more high-quality full-stack applications and continue contributing to the developer community.

---

## 🚀 Thank You for Visiting WanderLust!

If you're a recruiter or developer reviewing this repository, thank you for your time. Feedback, suggestions, and contributions are always appreciated.
