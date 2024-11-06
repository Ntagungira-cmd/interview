import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Car } from "./car.entity";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<Car[]> {
    const skip = (page - 1) * limit;
    return this.carRepository.find({
      skip,
      take: limit,
    });
  }

  async create(car: Car): Promise<Car> {
    return this.carRepository.save(car);
  }
}
