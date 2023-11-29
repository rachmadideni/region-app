import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
// import { DistrictDto } from './dto/district.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

// import {
//   paginate,
//   Pagination,
//   IPaginationOptions,
// } from 'nestjs-typeorm-paginate';
// import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepository.save(createDistrictDto);
  }

  // backup findAll
  /*
  async findAll(oid_city?: string) {
    const opt: FindManyOptions<District> = {
      relations: ['cities'],
    };
    if (oid_city) {
      opt.where = {
        cities: { oid_city },
      };
    }

    return this.districtRepository.find(opt);
  }*/

  /*
  async findAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.districtRepository.createQueryBuilder('district');
    queryBuilder
      .leftJoinAndSelect('district.cities', 'c')
      .orderBy('district.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }
  */
  async findAll() {
    const districts = await this.districtRepository.find({
      relations: ['cities'],
    });
    return {
      statusCode: 200,
      message: 'success',
      data: districts ? [...districts] : [],
    };
  }

  findOne(id: number) {
    return this.districtRepository.findOne({ where: { id: id } });
  }

  findby(oid_city: string) {
    return this.districtRepository.find({ relations: ['cities'] });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.districtRepository.update(
          { id },
          {
            oid_district: updateDistrictDto.oid_district,
            oid_city: updateDistrictDto.oid_city,
            district_name: updateDistrictDto.district_name,
          },
        );
        resolve(this.findOne(id));
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(id: number) {
    return this.districtRepository.delete({ id });
  }

  async searchByName(name: string, pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.districtRepository
      .createQueryBuilder('d')
      .innerJoinAndSelect('d.cities', 'c')
      .where('d.district_name LIKE :name', {
        name: `%${name}%`,
      } as any)
      .orderBy('d.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    // console.log(queryBuilder.getSql());
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async searchByOidDistrict(oid_district: string) {
    const queryBuilder = this.districtRepository
      .createQueryBuilder('sd')
      .where('sd.oid_district = :oid_district', {
        oid_district: oid_district,
      } as any)
      .take(1);

    console.log(queryBuilder.getSql());
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
  }
}
