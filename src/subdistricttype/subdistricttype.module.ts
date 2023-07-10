import { Module } from '@nestjs/common';
import { SubdistricttypeService } from './subdistricttype.service';
import { SubdistricttypeController } from './subdistricttype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdistricttype } from './entities/subdistricttype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subdistricttype])],
  exports: [SubdistricttypeService],
  controllers: [SubdistricttypeController],
  providers: [SubdistricttypeService]
})
export class SubdistricttypeModule {}
