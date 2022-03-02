import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  async getAll(query = {}) {
    const cars = await dbContext.Cars.find(query)
    return cars
  }

  async getById(id) {
    const car = await dbContext.Cars.findById(id)
    if (!car) {
      throw new BadRequest('invalid car id')
    }
    return car
  }

  async create(body) {
    const car = await dbContext.Cars.create(body)
    return car
  }

  async edit(body) {
    const original = await this.getById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You do not own this car... yet')
    }
    // we use a turnary to validate if data was passed, otherwise keep as is
    original.make = body.make == null ? original.make : body.make
    original.model = body.model == null ? original.model : body.model
    original.year = body.year == null ? original.year : body.year
    original.price = body.price == null ? original.price : body.price
    original.imgUrl = body.imgUrl == null ? original.imgUrl : body.imgUrl

    await original.save({ runValidators: true })
    return original
  }

  async remove(carId, userId) {
    // SAFETY FIRST
    // does that car exist
    const car = await this.getById(carId)
    // only the creator can delete the objects they created
    // NOTE creatorId is an object YOU MUST CONVERT IT TO A STRING
    if (car.creatorId.toString() !== userId) {
      throw new Forbidden('That aint your car bro')
    }
    await dbContext.Cars.findByIdAndDelete(carId)
  }
}

export const carsService = new CarsService()
