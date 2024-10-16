const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialHandle: { type: String, required: true },
    images: [String]
});

module.exports = mongoose.model('Submission', submissionSchema);
