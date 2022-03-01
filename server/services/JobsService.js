import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class JobsService {
  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden(`You can't change that!`)
    }
    original.company = update.company ? update.company : original.company
    original.jobTitle = update.jobTitle ? update.jobTitle : original.jobTitle
    original.hours = update.hours ? update.hours : original.hours
    original.rate = update.rate ? update.rate : original.rate
    original.description = update.description ? update.description : original.description
    await original.save({ runValidators: true })
    return original
  }
  async getById(id) {
    const job = await dbContext.Jobs.findById(id)
    if (!job) {
      throw new BadRequest('Bad job id')
    }
    return job
  }
  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }
  async getAll(query = {}) {
    const jobs = await dbContext.Jobs.find(query)
    return jobs
  }
  async remove(jobId, userId) {
    const job = await this.getById(jobId)
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden(`That's someone else's job, dude`)
    }
    await dbContext.Jobs.findByIdAndDelete(jobId)
  }
}

export const jobsService = new JobsService()