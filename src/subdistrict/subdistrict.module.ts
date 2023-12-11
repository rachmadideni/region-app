import { Module } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { SubdistrictController } from './subdistrict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdistrict } from './entities/subdistrict.entity';
import { UniqueFieldValidator } from './validators/unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Subdistrict])],
  exports: [SubdistrictService],
  controllers: [SubdistrictController],
  providers: [SubdistrictService, UniqueFieldValidator],
})
export class SubdistrictModule {}
