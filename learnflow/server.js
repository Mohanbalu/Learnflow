// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose.connect("mongodb+srv://mohanbalu292:mohanbalu2004@users.jdpsb.mongodb.net/")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("MongoDB connection failed: ", error));

// MongoDB User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("users", UserSchema);

// Registration Endpoint
app.post("/register", async (req, res) => {
  const { username, email, password, dob, country, phone } = req.body;

  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dob,
      country,
      phone,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error('Error: ', err);
    if (err.code === 11000) {
      // Duplicate email error
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Registration failed", error: err });
    }
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        dob: user.dob,
        country: user.country,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
