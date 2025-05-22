import {
  createJobInDB,
  getAllJobsService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
} from '../models/jobModel.js'

// 🔸 Create an job
export const createJob = async (req, res) => {
  const {
    job_title,
    company_name,
    cv_file_url,
    cover_letter_url,
    job_description,
    phase,
    application_date,
    platform,
    first_response_days,
    feedback,
    location,
    job_type,
    notes,
  } = req.body

  const user_id = req.userId 

  try {
    const job = await createJobInDB({
      user_id,
      job_title,
      company_name,
      cv_file_url,
      cover_letter_url,
      job_description,
      phase,
      application_date,
      platform,
      first_response_days,
      feedback,
      location,
      job_type,
      notes,
    })

    res.status(201).json({ message: 'Job created', job })
  } catch (error) {
    console.error('Error creating job:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// 🔸 List jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService()
    res.status(200).json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// 🔸 Get job by ID
export const getJobById = async (req, res) => {
  const { id } = req.params

  try {
    const job = await getJobByIdService(id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json(job)
  } catch (error) {
    console.error('Error fetching job by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// 🔸 Uptade job
export const updateJob = async (req, res) => {
  const { id } = req.params
  const jobData = req.body

  try {
    const updatedJob = await updateJobService(id, jobData)

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found or update failed' })
    }

    res.status(200).json({ message: 'Job updated', job: updatedJob })
  } catch (error) {
    console.error('Error updating job:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// 🔸 Delete job
export const deleteJob = async (req, res) => {
  const { id } = req.params

  try {
    const deletedJob = await deleteJobService(id)

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json({ message: 'Job deleted successfully', job: deletedJob })
  } catch (error) {
    console.error('Error deleting job:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
