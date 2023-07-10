import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class DistrictService {
  constructor(@InjectRepository(District)private districtRepository:Repository<District>,) { }
  async create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepository.save(createDistrictDto);
  }

  findAll(oid_city?: string) {

    const opt: FindManyOptions<District> = {
      relations: ['cities']
    }
    if (oid_city) {
      opt.where = {
        cities: { oid_city }
      }
    }
    return this.districtRepository.find(opt);
  }

  findOne(id: number) {
    return this.districtRepository.findOne({ where: { id: id } });
  }

  findby(oid_city: string) {
    return this.districtRepository.find({relations: ['cities']});
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.districtRepository.update({ id }, { district_name: updateDistrictDto.district_name,
          oid_city: updateDistrictDto.oid_city});
        resolve(this.findOne(id));
      } catch (error) {
        reject(error)
      }
    });
  }

  remove(id: number) {
    return this.districtRepository.delete({id});
  }
}
