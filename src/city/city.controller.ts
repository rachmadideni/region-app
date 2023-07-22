import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  // Query,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Response } from 'express';
import {
  // ApiOperation,
  // ApiResponse,
  // ApiOkResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  // ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'Create new City' })
  @ApiConflictResponse({
    description: 'oid city is already taken',
    schema: {
      example: {
        message: 'oid city is already taken',
        data: null,
      },
    },
  })
  @Post()
  async create(
    @Body() createCityDto: CreateCityDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.cityService.create(createCityDto);
      response.status(HttpStatus.OK).json({
        message: 'City has been created successfully',
        city: res,
      });
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        return response.status(HttpStatus.CONFLICT).json({
          message: 'oid city is already taken',
          data: null,
        });
      }

      if (error.status === HttpStatus.BAD_REQUEST) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Bad Request',
          data: null,
        });
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No City Added successfully',
        city: null,
      });
    }
  }

  @ApiOperation({ summary: 'Get all city' })
  @Get()
  async findAll() {
    try {
      const allCities = await this.cityService.findAll();
      return {
        statusCode: 200,
        message: 'success',
        data: allCities ?? [],
      };
    } catch (err) {
      console.log({ err });
    }
  }

  @ApiOperation({ summary: 'Get city by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const city = await this.cityService.findOne(+id);
      return {
        statusCode: 200,
        message: 'success',
        data: city ?? null,
      };
    } catch (err) {
      console.log({ err });
    }
  }

  @ApiOperation({ summary: 'Update city by id' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.cityService.update(+id, updateCityDto);
      response.status(HttpStatus.OK).json({
        message: 'City has been Updated Successfully',
        city: res,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No City Update',
        city: null,
      });
    }
  }

  @ApiOperation({ summary: 'Delete city by id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.cityService.remove(+id);
      return {
        message: 'City has been deleted successfully',
      };
    } catch (error) {
      return {
        message: 'no City deleted successfully',
      };
    }
  }
}
