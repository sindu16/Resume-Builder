const Resume = require('../models/Resume');

// GET all resumes


exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ lastUpdated: -1 });

    if (resumes.length === 0) {
      return res.status(200).json({ message: 'No resumes found', resumes: [] });
    }

    res.json(resumes);
  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};


// // POST create new resume
exports.addResume = async (req, res) => {
  const { title, thumbnail } = req.body;
  try {
    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      thumbnail,
      lastUpdated: new Date(),
    });
    
    
    res.status(201).json({
      success: true,
      data: newResume,
      message: 'Resume created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create resume' });
  }
};

// GET single resume
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};




// PUT update resume
exports.updateResume = async (req, res) => {
  const { id } = req.params;
  const payload = req.body?.data || req.body;

  try {
    const resume = await Resume.findOne({ _id: id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Basic info
    if (payload.title !== undefined) resume.title = payload.title;
    if (payload.thumbnail !== undefined) resume.thumbnail = payload.thumbnail;

    // Personal section - safely merge nested fields
    if (payload.personal) {
      resume.personal = {
        ...resume.personal?.toObject?.() || {},
        ...payload.personal,
      };
    }

    // Theme color
    if (payload.themeColor !== undefined) resume.themeColor = payload.themeColor;

    // Skills
    if (Array.isArray(payload.skills)) {
      resume.skills = payload.skills;
    }

    // Education
    if (Array.isArray(payload.education)) {
      resume.education = payload.education;
    }

    // Experience
    if (Array.isArray(payload.experience)) {
      resume.experience = payload.experience;
    }

    // Projects
    if (Array.isArray(payload.projects)) {
      resume.projects = payload.projects;
    }

    // Save updated time
    resume.lastUpdated = new Date();
    const updated = await resume.save();

    res.json({
      success: true,
      data: updated,
      message: 'Resume updated successfully',
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update resume' });
  }
};


// DELETE resume
exports.deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};

