import { Injectable } from '@nestjs/common';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistrict } from './entities/subdistrict.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class SubdistrictService {
  constructor(
    @InjectRepository(Subdistrict)
    private subdistrictRepository: Repository<Subdistrict>,
  ) {}
  async create(createSubdistrictDto: CreateSubdistrictDto) {
    return this.subdistrictRepository.save(createSubdistrictDto);
  }

  // backup findAll
  /*
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
  */

  // async findAll(pageOptionsDto: PageOptionsDto) {
  //   const queryBuilder =
  //     this.subdistrictRepository.createQueryBuilder('subdistrict');
  //   queryBuilder
  //     .leftJoinAndSelect('subdistrict.districtes', 'd')
  //     .orderBy('subdistrict.id', pageOptionsDto.order)
  //     .skip(pageOptionsDto.skip)
  //     .take(pageOptionsDto.take);

  //   const itemCount = await queryBuilder.getCount();
  //   const { entities } = await queryBuilder.getRawAndEntities();

  //   const pageMetaDto = new PageMetaDto({
  //     itemCount,
  //     pageOptionsDto,
  //   });

  //   return new PageDto(entities, pageMetaDto);
  // }

  async findAll() {
    const subdistrictAll = await this.subdistrictRepository.find({
      relations: ['districtes'],
    });
    return subdistrictAll;
  }

  findOne(id: number) {
    return this.subdistrictRepository.findOne({ where: { id: id } });
  }

  findby(oid_district: string) {
    return this.subdistrictRepository.find({ relations: ['districtes'] });
  }

  update(id: number, updateSubdistrictDto: UpdateSubdistrictDto) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.subdistrictRepository.update(
          { id },
          {
            subdistrict_name: updateSubdistrictDto.subdistrict_name,
            post_code: updateSubdistrictDto.post_code,
          },
        );
        resolve(this.findOne(id));
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(id: number) {
    return this.subdistrictRepository.delete({ id });
  }

  async searchByName(name: string, pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.subdistrictRepository
      .createQueryBuilder('sd')
      .innerJoinAndSelect('sd.districtes', 'd')
      .where('sd.subdistrict_name LIKE :name', { name: `%${name}%` } as any)
      .orderBy('sd.id', pageOptionsDto.order)
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
}
