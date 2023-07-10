import { Subdistrict } from "src/subdistrict/entities/subdistrict.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_ms_subdistricttype')
export class Subdistricttype {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 10})
    subdistrict_type: string;

    @OneToMany((type) => Subdistrict, (subdistricts) => subdistricts.subdistricttypes, {nullable: true})
    subdistrict: Subdistrict;
    subdistricts: any;
}
