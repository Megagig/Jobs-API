const createJob = async (req, res) => {
  res.send('Create Job');
};

const getJobs = async (req, res) => {
  res.send('Get Jobs');
};

const getAllJob = async (req, res) => {
  res.send('Get Job');
};

const updateJob = async (req, res) => {
  res.send('Update Job');
};

const deleteJob = async (req, res) => {
  res.send('Delete Job');
};

module.exports = {
  createJob,
  getJobs,
  getAllJob,
  updateJob,
  deleteJob,
};
