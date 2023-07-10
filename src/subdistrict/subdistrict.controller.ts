import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { Response } from 'express';

@Controller('subdistrict')
export class SubdistrictController {
  constructor(private readonly subdistrictService: SubdistrictService) {}

  @Post()
  async create(@Body() createSubdistrictDto: CreateSubdistrictDto, @Res() response: Response) {
    try {
      const res = await this.subdistrictService.create(createSubdistrictDto);
      response.status(HttpStatus.OK).json({
        message: 'Subdistrict has been created successfully',
        subdistrict: res,
      });
    } catch (error) {
      // console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Subdistrict Added successfully',
        subdistrict: null,
      });
    }
  }

  @Get()
  async findAll(@Query() params: any) {
    const subdistrictAll = await this.subdistrictService.findAll(params && params.oid_district);
    return {
      statusCode: 200,
      message: 'success',
      data: subdistrictAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subdistrict = await this.subdistrictService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: subdistrict??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubdistrictDto: UpdateSubdistrictDto, @Res() response: Response) {
    try {
      const res = await this.subdistrictService.update(+id, updateSubdistrictDto);
      response.status(HttpStatus.OK).json({
        message: 'Subdistrict has been Updated Successfully',
        subdistrict: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Subdistrict Update',
        subdistrict: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.subdistrictService.remove(+id);
      return {
        message: 'Subdistrict has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'No Subdistrict deleted',
      }
    }
  }
}
