import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SubdistricttypeService } from './subdistricttype.service';
import { CreateSubdistricttypeDto } from './dto/create-subdistricttype.dto';
import { UpdateSubdistricttypeDto } from './dto/update-subdistricttype.dto';
import { Response } from 'express';

@Controller('subdistricttype')
export class SubdistricttypeController {
  constructor(private readonly subdistricttypeService: SubdistricttypeService) {}

  @Post()
  async create(@Body() createSubdistricttypeDto: CreateSubdistricttypeDto, @Res() response: Response) {
    try {
      const res = await this.subdistricttypeService.create(createSubdistricttypeDto);
      response.status(HttpStatus.OK).json({
        message: 'Subdistricttype has been created successfully',
        subdistricttype: res,
      });
    } catch (error) {
      // console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Subdistricttype Added successfully',
        subdistricttype: null,
      });
    }
  }

  @Get()
  async findAll() {
    const subdistricttypeAll = await this.subdistricttypeService.findAll();
    return {
      statusCode: 200,
      message: 'success',
      data: subdistricttypeAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subdistricttype = await this.subdistricttypeService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: subdistricttype??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubdistricttypeDto: UpdateSubdistricttypeDto, @Res() response: Response){
    try {
      const res = await this.subdistricttypeService.update(+id, updateSubdistricttypeDto);
      response.status(HttpStatus.OK).json({
        message: 'Subdistricttype has been Updated Successfully',
        subdistricttype: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Subdistricttype Update',
        subdistricttype: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.subdistricttypeService.remove(+id);
      return {
        message: 'Districttype has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'No Districttype deleted',
      }
    }
  }
}
