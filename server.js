const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Assuming your user model is in models/user.js
// const User = require('./models/user');
// Middleware to parse JSON request bodies
app.use(express.json());

// Configure nodemailer transporter (replace with your email service details and use environment variables)
// Example using Gmail:
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address (use environment variable)
    pass: process.env.EMAIL_PASS  // Your email password (use environment variable)
  }
});

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// POST route for contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please include name, email, and message' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: 'your_recipient_email@example.com', // Your recipient email address (replace with your email)
    subject: `New message from ${name}`, // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ msg: 'Error sending message' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});