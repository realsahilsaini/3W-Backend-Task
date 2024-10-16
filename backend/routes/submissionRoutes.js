const express = require('express');
const multer = require('multer');
const path = require('path');
const Submission = require('../models/submission');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Route to handle form submission
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const { name, socialHandle } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newSubmission = new Submission({ name, socialHandle, images: imagePaths });
        await newSubmission.save();
        res.status(201).json({ message: 'Submission successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving submission', error });
    }
});

// Route to fetch all submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error });
    }
});

module.exports = router;
