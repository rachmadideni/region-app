import { City } from 'src/city/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_ms_province')
export class Province {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 2,
    unique: true,
    nullable: false,
  })
  oid_province: string;
  @Column({
    length: 100,
    nullable: false,
  })
  province_name: string;

  @OneToMany((type) => City, (cities) => cities.province, { nullable: true })
  city: City;
  cities: any;
}
