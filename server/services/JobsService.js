import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class JobsService {
  async edit(body) {
    const original = await this.getById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden(`You can't change that!`)
    }
    original.company = body.company == null ? original.company : body.company
    original.jobTitle = body.jobTitle == null ? original.jobTitle : body.jobTitle
    original.hours = body.hours == null ? original.hours : body.hours
    original.rate = body.rate == null ? original.rate : body.rate
    original.description = body.description == null ? original.description : body.description
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