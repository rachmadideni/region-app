import { Injectable } from '@nestjs/common';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistrict } from './entities/subdistrict.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class SubdistrictService {
  constructor(@InjectRepository(Subdistrict)private subdistrictRepository:Repository<Subdistrict>,) { }
  async create(createSubdistrictDto: CreateSubdistrictDto) {
    return this.subdistrictRepository.save(createSubdistrictDto);
  }

  findAll(oid_district?: string) {
    const opt: FindManyOptions<Subdistrict> = {
      relations: ['districtes']
    }
    if (oid_district) {
      opt.where = {
        districtes: { oid_district }
      }
    }
    return this.subdistrictRepository.find(opt);
  }

  findOne(id: number) {
    return this.subdistrictRepository.findOne({ where: { id: id } });
  }

  findby(oid_district: string) {
    return this.subdistrictRepository.find({relations: ['districtes']});
  }

  update(id: number, updateSubdistrictDto: UpdateSubdistrictDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.subdistrictRepository.update({ id }, { subdistrict_name: updateSubdistrictDto.subdistrict_name,
                                                          post_code: updateSubdistrictDto.post_code});
        resolve(this.findOne(id));
      } catch (error) {
        reject(error)
      }
    });
  }

  remove(id: number) {
    return this.subdistrictRepository.delete({id});
  }
}