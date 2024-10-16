const Submission = require('../models/submission');
const multer = require('multer');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Handle form submission
exports.submitForm = (req, res) => {
  upload.array('images')(req, res, async (err) => {
    if (err) {
      return res.status(500).send('Image upload failed');
    }
    const { name, handle } = req.body;
    const images = req.files.map(file => file.path);
    
    try {
      const newSubmission = new Submission({ name, handle, images });
      await newSubmission.save();
      res.status(200).send('Submission successful');
    } catch (error) {
      res.status(500).send('Error saving submission');
    }
  });
};

// Fetch submissions for admin dashboard
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).send('Error fetching submissions');
  }
};
