import { District } from "src/district/entities/district.entity";
import { Subdistricttype } from "src/subdistricttype/entities/subdistricttype.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_ms_subdistrict')
export class Subdistrict {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 12,unique: true})
    oid_subdistrict: string;
    @Column({length: 150})
    subdistrict_name: string;
    @Column()
    oid_subdistricttype: number;
    @Column({length: 8})
    oid_district: string;
    @Column({length: 5})
    post_code: string;

    @ManyToOne((type) => Subdistricttype, (subdistricttypes) => subdistricttypes.id, {cascade: true})
    @JoinColumn({name: 'oid_subdistricttype', referencedColumnName: 'id'})
    subdistricttypes: Subdistricttype;

    @ManyToOne((type) => District, (districtes) => districtes.oid_district, {cascade: true})
    @JoinColumn({name: 'oid_district', referencedColumnName: 'oid_district'})
    districtes: District;


}
