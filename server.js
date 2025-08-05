const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import the email handler
const sendEmailHandler = require('./api/send-email.js');

// API route
app.post('/api/send-email', sendEmailHandler);

// Serve static files from dist directory (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing (for production)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});