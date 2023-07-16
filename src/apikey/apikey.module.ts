import { Module } from '@nestjs/common';
import { ApikeyController } from './apikey.controller';
import { ApikeyService } from './apikey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apikey } from './entities/apikey.entity';
import { ApiConsumer } from './entities/apiconsumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apikey, ApiConsumer])],
  controllers: [ApikeyController],
  providers: [ApikeyService],
})
export class ApikeyModule {}
