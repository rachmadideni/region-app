import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApikeyService } from './apikey.service';
import { CreateApiKeyDto } from './dto/createApiKey.dto';
@ApiTags('apikey')
@Controller('apikey')
export class ApikeyController {
  constructor(private readonly apikeyService: ApikeyService) {}
  @Post('consumer/create')
  async create(@Body() request: CreateApiKeyDto) {
    await this.apikeyService.createApiConsumerWithKey(request);
    return {
      statusCode: HttpStatus.OK,
      message: 'test',
    };
  }
}
