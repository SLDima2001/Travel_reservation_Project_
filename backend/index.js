import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongodbURL, stripeSecretKey } from './config.js';
import Route from './routes/Route.js';
import emailRoute from './routes/emailRoute.js';
import Stripe from 'stripe';
import 'dotenv/config'


const stripe = new Stripe(stripeSecretKey);

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send("Welcome to MERN stack");
});

app.use('/feedback', Route);
app.use('/send-email', emailRoute);

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
    console.log(error);
  });
