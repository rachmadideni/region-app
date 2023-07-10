import { Citytipe } from "src/citytipe/entities/citytipe.entity";
import { District } from "src/district/entities/district.entity";
import { Province } from "src/province/entities/province.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_ms_city')
export class City {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 4, unique: true})
    oid_city: string;
    @Column({ length: 100 })
    city_name: string;
    @Column({ length: 2 })
    oid_province: string;
    @Column()
    oid_cititype: number;

    @ManyToOne((type) => Province, (province) => province.oid_province, {cascade: true})
    @JoinColumn({name: 'oid_province', referencedColumnName: 'oid_province'})
    province: Province;

    @ManyToOne((type) => Citytipe, (cititype) => cititype.id, {cascade: true})
    @JoinColumn({name: 'oid_cititype', referencedColumnName: 'id'})
    cititype: Citytipe;

    @OneToMany((type) => District, (district) => district.cities, {nullable: true})
    district: District;
    distries: any;
}
