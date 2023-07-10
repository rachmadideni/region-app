import { City } from "src/city/entities/city.entity";
import { Subdistrict } from "src/subdistrict/entities/subdistrict.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_ms_district')
export class District {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 8,unique: true})
    oid_district: string;
    @Column({length: 4})
    oid_city: string;
    @Column({length: 100})
    district_name: string;

    @ManyToOne((type) => City, (cities) => cities.oid_city, {cascade: true})
    @JoinColumn({name: 'oid_city', referencedColumnName: 'oid_city'})
    cities: City;

    @OneToMany((type) => Subdistrict, (subdistrictes) => subdistrictes.districtes, {nullable: true})
    subdistrict: Subdistrict;
    districtes: any;

}
