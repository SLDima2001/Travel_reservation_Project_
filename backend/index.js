import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongodbURL, stripeSecretKey } from './config.js';
import Route from './routes/Route.js';

import Stripe from 'stripe';
import 'dotenv/config';
import contactusRoute from './routes/ContactusRoute.js';
import bcrypt from "bcryptjs";
import bodyParser from 'body-parser';
import PaymentRoute from './routes/PaymentRoute.js'
import dotenv from "dotenv";
import axios from 'axios';




dotenv.config();










const stripe = new Stripe(stripeSecretKey);
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send("Welcome to MERN stack");
});

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);





const TextSchema = new mongoose.Schema({ text: String });
const TextModel = mongoose.model("Text", TextSchema);







const API_KEY = "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";
console.log("API Key configured:", !!API_KEY);

app.post("/getRecommendations", async (req, res) => {
  const { weather, duration, interests, guestType, budget } = req.body;

  if (!weather || !duration || !interests || !guestType || !budget) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
You are a professional travel planner.

Suggest a personalized travel plan for Sri Lanka based on these preferences:
- Weather preference: ${weather}
- Trip duration: ${duration} days
- Interests: ${interests}
- Guest type: ${guestType}
- Budget level: ${budget}

Provide specific destination suggestions, and a day-wise outline if possible.
`;

  try {
    console.log("Using API key:", API_KEY ? "Key is present" : "Key is missing");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
        "X-Title": "Travel Recommender App"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }]
      })
    });

    // Log complete response details for debugging
    const responseStatus = response.status;
    const responseText = await response.text();
    
    console.log("API Response Status:", responseStatus);
    console.log("API Response Text (first 500 chars):", responseText.substring(0, 500));
    
    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse API response as JSON:", e);
      return res.status(500).json({ error: "Invalid response from API", details: responseText.substring(0, 200) });
    }

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: "API error", 
        details: data.error || "Unknown error" 
      });
    }

    const aiReply = data.choices?.[0]?.message?.content;

    if (!aiReply) {
      return res.status(500).json({ 
        error: "No content in API response", 
        details: data 
      });
    }

    res.json({ recommendation: aiReply });
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "Failed to get AI recommendations.", details: error.message });
  }
});

// Add a fallback endpoint that doesn't use API
app.post("/getRecommendationsFallback", (req, res) => {
  const { weather, duration, interests, guestType, budget } = req.body;
  
  // Generate a recommendation based on user inputs
  const recommendation = `
# Sri Lanka Travel Plan

## Based on your preferences:
- Weather: ${weather}
- Duration: ${duration} days
- Interests: ${interests}
- Travelers: ${guestType}
- Budget: ${budget}

## Recommended Itinerary:

### Day 1-2: Colombo
- Explore the capital city
- Visit Galle Face Green
- Shop at local markets

### Day 3-4: Kandy
- Visit the Temple of the Tooth
- Explore the Royal Botanical Gardens
- Experience local cultural shows

### Day 5-6: Beaches
- Relax at Mirissa or Unawatuna Beach
- Try water sports and whale watching

### Day 7: Departure
- Last-minute shopping
- Cultural experiences

This itinerary is customized for your preferences. Enjoy your trip to Sri Lanka!
  `;
  
  res.json({ recommendation: recommendation });
});
















app.post("/api/save-text", async (req, res) => {
  try {
    const newText = new TextModel({ text: req.body.text });
    await newText.save();
    res.json({ message: "Text saved successfully!", id: newText._id });
  } catch (error) {
    res.status(500).json({ error: "Error saving text" });
  }
});

// 📌 GET: Fetch All Saved Texts
app.get("/api/get-texts", async (req, res) => {
  try {
    const texts = await TextModel.find();
    res.json(texts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching texts" });
  }
});

// 📌 PUT: Update a Text Entry
app.put("/api/update-text/:id", async (req, res) => {
  try {
    const updatedText = await TextModel.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
    res.json({ message: "Text updated successfully!", updatedText });
  } catch (error) {
    res.status(500).json({ error: "Error updating text" });
  }
});

// 📌 DELETE: Remove a Text Entry
app.delete("/api/delete-text/:id", async (req, res) => {
  try {
    await TextModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Text deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting text" });
  }
});







// Register Route (Encrypt password before saving)
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Error registering user", error: error.message });
  }
});

// Login Route (Compare encrypted passwords)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/api/auth/users", async (req, res) => {
  try {
    const users = await User.find({}, "email createdAt"); // Fetch users with only email & createdAt fields
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
  }
});


app.delete("/api/auth/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
  }
});



// Routes for other functionality
app.use('/feedback', Route);
app.use('/contact', contactusRoute);
app.use('/payment', PaymentRoute);


// Stripe payment route
app.post('/create-checkout-session', async (req, res) => {
  const { totalAmount } = req.body;
  console.log('Total Amount:', totalAmount);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Tour Package',
            },
            unit_amount: totalAmount * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/PaymentSuccess',
      cancel_url: 'http://localhost:5173/PaymentCancel',
    });

    console.log('Session ID:', session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
});

mongoose
  .connect(mongodbURL, {})
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
