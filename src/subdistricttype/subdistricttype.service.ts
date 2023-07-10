import { Injectable } from '@nestjs/common';
import { CreateSubdistricttypeDto } from './dto/create-subdistricttype.dto';
import { UpdateSubdistricttypeDto } from './dto/update-subdistricttype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistricttype } from './entities/subdistricttype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubdistricttypeService {
  constructor(@InjectRepository(Subdistricttype)private subdistricttypeRepository:Repository<Subdistricttype>,) { }
  async create(createSubdistricttypeDto: CreateSubdistricttypeDto) {
    return this.subdistricttypeRepository.save(createSubdistricttypeDto);
  }

  findAll() {
    return this.subdistricttypeRepository.find();
  }

  findOne(id: number) {
    return this.subdistricttypeRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateSubdistricttypeDto: UpdateSubdistricttypeDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.subdistricttypeRepository.update({ id }, { subdistrict_type: updateSubdistricttypeDto.subdistrict_type});
        resolve(this.findOne(id));
      } catch (error) {
        reject(error)
      }
    });
  }

  remove(id: number) {
    return this.subdistricttypeRepository.delete({id});
  }
}
