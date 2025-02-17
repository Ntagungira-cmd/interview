import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column({nullable: true})
  plateNumber: string;

  @Column()
  yearOfManufacture: number;
}
