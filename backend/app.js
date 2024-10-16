const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const submissionRoutes = require('./routes/submissionRoutes');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// Routes
app.use('/api/submissions', submissionRoutes); // Link to submission routes

// Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: "The requested path could not be found." });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
