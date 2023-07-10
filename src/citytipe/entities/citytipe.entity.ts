import { City } from "src/city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_ms_city_tipe')
export class Citytipe {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 10})
    city_tipe: string;

    @OneToMany((type) => City, (cities) => cities.cititype, {nullable: true})
    city: City;
    cities: any;
}
