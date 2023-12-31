import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { FindManyOptions, FindOptions, Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}
  async create(createCityDto: CreateCityDto) {
    const isCityAlreadyExist = await this.cityRepository.findOne({
      where: {
        oid_city: createCityDto.oid_city,
      },
    });

    if (isCityAlreadyExist) {
      throw new HttpException('oid is already taken', HttpStatus.CONFLICT);
    }

    return this.cityRepository.save(createCityDto);
  }

  findAll(oid_province?: string) {
    const opt: FindManyOptions<City> = {
      relations: ['province'],
    };
    if (oid_province) {
      opt.where = {
        province: { oid_province },
      };
    }
    const result = this.cityRepository.find(opt);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.cityRepository.findOne({ where: { id: id } });
    return result;
  }

  findby(oid_province: string) {
    return this.cityRepository.find({ relations: ['province'] });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.cityRepository.update(
          { id },
          {
            city_name: updateCityDto.city_name,
            oid_province: updateCityDto.oid_province,
            oid_cititype: updateCityDto.oid_cititype,
          },
        );
        resolve(this.findOne(id));
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(id: number) {
    return this.cityRepository.delete({ id });
  }
}
