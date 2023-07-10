import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Response } from 'express';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto, @Res() response: Response) {
    try {
      const res = await this.districtService.create(createDistrictDto);
      response.status(HttpStatus.OK).json({
        message: 'District has been created successfully',
        district: res,
      });
    } catch (error) {
      // console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No District Added successfully',
        district: null,
      });
    }
  }

  @Get()
  async findAll(@Query() params: any) {
    const districtAll = await this.districtService.findAll(params && params.oid_city);
    return {
      statusCode: 200,
      message: 'success',
      data: districtAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const district = await this.districtService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: district??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto, @Res() response: Response) {
    try {
      const res = await this.districtService.update(+id, updateDistrictDto);
      response.status(HttpStatus.OK).json({
        message: 'District has been Updated Successfully',
        district: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No District Update',
        district: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.districtService.remove(+id);
      return {
        message: 'District has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'No District Deleted',
      }
    }
  }
}
