import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}
  async create(createProvinceDto: CreateProvinceDto) {
    const current = await this.provinceRepository.findOne({
      where: {
        oid_province: createProvinceDto.oid_province,
      },
    });

    if (current) {
      throw new HttpException('oid is already taken', HttpStatus.CONFLICT);
    }

    return this.provinceRepository.save(createProvinceDto);
  }

  findAll() {
    return this.provinceRepository.find();
  }

  findOne(id: number) {
    return this.provinceRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.provinceRepository.update(
          { id },
          { province_name: updateProvinceDto.province_name },
        );
        resolve(this.findOne(id));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  remove(id: number) {
    return this.provinceRepository.delete({ id });
  }
}
