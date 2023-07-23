import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { DistrictDto } from './dto/district.dto';
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

  async findAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.districtRepository.createQueryBuilder('district');
    queryBuilder
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
            district_name: updateDistrictDto.district_name,
            oid_city: updateDistrictDto.oid_city,
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
}
