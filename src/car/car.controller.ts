import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { Car } from "./car.entity";
import { CarService } from "./car.service";

@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getAllCars(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Car[]> {
    return this.carService.findAll(page, limit);
  }

  @Post()
  async createCar(@Body() car: Car): Promise<Car> {
    return this.carService.create(car);
  }
}
