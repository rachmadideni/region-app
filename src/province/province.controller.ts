import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Response } from 'express';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  async create(@Body() createProvinceDto: CreateProvinceDto, @Res() response: Response) {
    try {
      const res = await this.provinceService.create(createProvinceDto);
      response.status(HttpStatus.OK).json({
        message: 'Province has been created successfully',
        province: res,
      });
    } catch (error) {
      console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Province Added successfully',
        province: null,
      });
    }
  }

  @Get()
  async findAll() {
    const provinceAll = await this.provinceService.findAll();
    return {
      statusCode: 200,
      message: 'success',
      data: provinceAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const province = await this.provinceService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: province??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto, @Res() response: Response){
    try {
      const res = await this.provinceService.update(+id, updateProvinceDto);
      response.status(HttpStatus.OK).json({
        message: 'Province has been Updated Successfully',
        province: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Province Update',
        province: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.provinceService.remove(+id);
      return {
        message: 'Province has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'No Province Deleted',
      }
    }
  }
}
