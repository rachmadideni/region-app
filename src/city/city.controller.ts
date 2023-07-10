import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Response } from 'express';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto, @Res() response: Response) {
    try {
      const res = await this.cityService.create(createCityDto);
      response.status(HttpStatus.OK).json({
        message: 'City has been created successfully',
        city: res,
      });
    } catch (error) {
      // console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No City Added successfully',
        city: null,
      });
    }
  }

  @Get()
  async findAll(@Query() params: any) {


    const cityAll = await this.cityService.findAll(params && params.oid_province);
    return {
      statusCode: 200,
      message: 'success',
      data: cityAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const city = await this.cityService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: city??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto, @Res() response: Response) {
    try {
      const res = await this.cityService.update(+id, updateCityDto);
      response.status(HttpStatus.OK).json({
        message: 'City has been Updated Successfully',
        city: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No City Update',
        city: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.cityService.remove(+id);
      return {
        message: 'City has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'no City deleted successfully',
      }
    }
  }
}
