import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongodbURL, stripeSecretKey } from './config.js';
import Route from './routes/Route.js';
import emailRoute from './routes/emailRoute.js';
import Stripe from 'stripe';
import 'dotenv/config';
import contactusRoute from './routes/ContactusRoute.js';
import bcrypt from "bcryptjs";
import bodyParser from 'body-parser';
import PaymentRoute from './routes/PaymentRoute.js'















const stripe = new Stripe(stripeSecretKey);
const app = express();
app.use(bodyParser.json());
// Middleware for parsing request body
app.use(express.json());
app.use(cors({
  //origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow your frontend URLs here
 // methods: ['GET', 'POST'],
 // allowedHeaders: ['Content-Type', 'Authorization'],
}));

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

// Routes for other functionality
app.use('/feedback', Route);
app.use('/send-email', emailRoute);
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
