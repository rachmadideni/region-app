import { Module } from '@nestjs/common';
import { CitytipeService } from './citytipe.service';
import { CitytipeController } from './citytipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citytipe } from './entities/citytipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citytipe])],
  exports: [CitytipeService],
  controllers: [CitytipeController],
  providers: [CitytipeService]
})
export class CitytipeModule {}
