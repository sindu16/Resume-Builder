const express = require('express');
const {getResumes,
  addResume,
  getResumeById,
  updateResume,
  deleteResume, } = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getResumes);
router.post('/', authMiddleware, addResume);
router.get('/:id', authMiddleware, getResumeById);
router.put('/:id', authMiddleware, updateResume);
router.delete('/:id', authMiddleware, deleteResume);

module.exports = router;
