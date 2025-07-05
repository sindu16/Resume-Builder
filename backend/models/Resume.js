const mongoose = require('mongoose');

// Sub-schemas
const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, default: 0 }, // 1 to 5 stars
});

const educationSchema = new mongoose.Schema({
  degree: { type: String },
  institution: { type: String },
  startYear: { type: String },
  endYear: { type: String },
});

const experienceSchema = new mongoose.Schema({
  role: { type: String },
  company: { type: String },
  startYear: { type: String },
  endYear: { type: String },
  description: { type: String },
});

const projectSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  github: { type: String },
  demo: { type: String },
});

const skillSchema = new mongoose.Schema({
  name: { type: String },
  proficiency: { type: Number }, // 1 to 5 stars
});

// === Main Resume Schema ===
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      
    },

    thumbnail: {
      type: String, // Optional preview image
    },

    personal: {
      fullName: { type: String },
      designation: { type: String },
      summary: { type: String },
      profileImage: { type: String }, // base64 or URL
      phone: { type: String },
      email: { type: String },
      address: { type: String },
      location: { type: String },
      linkedin: { type: String },
      github: { type: String },
      website: { type: String },
      languages: [languageSchema],
      interests: [String],
    },

    skills: [skillSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],

    themeColor: {
      type: String,
     
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
