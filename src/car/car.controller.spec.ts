import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car } from './car.entity';

describe('CarController', () => {
  let app: INestApplication;
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    carService = module.get<CarService>(CarService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getAllCars', () => {
    it('should return an array of cars', async () => {
      const cars: Car[] = [
        { id: 1, name: 'Toyota', model: 'Corolla', plateNumber:"MJ231",yearOfManufacture: 2020},
        { id: 2, name: 'Honda', model: 'Civic', plateNumber:"MJ234", yearOfManufacture: 2021},
      ];

      jest.spyOn(carService, 'findAll').mockResolvedValue(cars);

      const response = await request(app.getHttpServer()).get('/cars');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(cars);
    });
  });

  describe('createCar', () => {
    it('should create a new car', async () => {
      const newCar: Car = {
        id: 1,
        name: 'Toyota',
        model: 'Corolla',
        yearOfManufacture: 2020,
        plateNumber: ''
      };

      jest.spyOn(carService, 'create').mockResolvedValue(newCar);

      const response = await request(app.getHttpServer())
        .post('/cars')
        .send(newCar);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newCar);
    });
  });
});
