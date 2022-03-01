import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { jobsService } from "../services/JobsService";
import BaseController from "../utils/BaseController";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const jobs = await jobsService.getAll(req.query)
      return res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const job = await jobsService.getById(req.params.id)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const job = await jobsService.create(req.body)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await jobsService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const jobId = req.params.id
      await jobsService.remove(jobId, userId)
      return res.send('Job round-filed')
    } catch (error) {
      next(error)
    }
  }
}