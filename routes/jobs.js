const express = require('express');
const router = express.Router();

const {
  createJob,
  getJobs,
  getAllJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.post('/', createJob);
router.get('/:id', getJobs);
router.get('/', getAllJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);
module.exports = router; // Export the router
