import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apikey } from './entities/apikey.entity';
import { ApiConsumer } from './entities/apiconsumer.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateApiKeyDto } from './dto/createApiKey.dto';
@Injectable()
export class ApikeyService {
  constructor(
    @InjectRepository(Apikey) private apikeyRepo: Repository<Apikey>,
    @InjectRepository(ApiConsumer)
    private apikeyConsumer: Repository<ApiConsumer>,
  ) {}

  async createApiConsumerWithKey(body: CreateApiKeyDto): Promise<any> {
    const apiConsumer = await this.apikeyConsumer.save({
      name: body.name,
    });

    const newApiKey = new Apikey();
    newApiKey.key = uuidv4();
    newApiKey.consumer = apiConsumer;
    return this.apikeyRepo.save(newApiKey);
  }
}
