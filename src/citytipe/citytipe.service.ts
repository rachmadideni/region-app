import { Injectable } from '@nestjs/common';
import { CreateCitytipeDto } from './dto/create-citytipe.dto';
import { UpdateCitytipeDto } from './dto/update-citytipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Citytipe } from './entities/citytipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitytipeService {
  constructor(@InjectRepository(Citytipe)private citytipeRepository:Repository<Citytipe>,) { }
  async create(createCitytipeDto: CreateCitytipeDto) {
    return this.citytipeRepository.save(createCitytipeDto);
  }

  findAll() {
    return this.citytipeRepository.find();
  }

  findOne(id: number) {
    return this.citytipeRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateCitytipeDto: UpdateCitytipeDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.citytipeRepository.update({ id }, { city_tipe: updateCitytipeDto.city_tipe});
        resolve(this.findOne(id));
      } catch (error) {
        reject(error)
      }
    });
  }

  remove(id: number) {
    return this.citytipeRepository.delete({id});
  }
}
