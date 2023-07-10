import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CitytipeService } from './citytipe.service';
import { CreateCitytipeDto } from './dto/create-citytipe.dto';
import { UpdateCitytipeDto } from './dto/update-citytipe.dto';
import { Response } from 'express';

@Controller('citytipe')
export class CitytipeController {
  constructor(private readonly citytipeService: CitytipeService) {}

  @Post()
  async create(@Body() createCitytipeDto: CreateCitytipeDto, @Res() response: Response) {
    try {
      const res = await this.citytipeService.create(createCitytipeDto);
      response.status(HttpStatus.OK).json({
        message: 'Citytipe has been created successfully',
        citytipe: res,
      });
    } catch (error) {
      // console.log(error)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Citytipe Added successfully',
        citytipe: null,
      });
    }
  }

  @Get()
  async findAll() {
    const citytipeAll = await this.citytipeService.findAll();
    return {
      statusCode: 200,
      message: 'success',
      data: citytipeAll??[]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const citytipe = await this.citytipeService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: citytipe??[]
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCitytipeDto: UpdateCitytipeDto, @Res() response: Response){
    try {
      const res = await this.citytipeService.update(+id, updateCitytipeDto);
      response.status(HttpStatus.OK).json({
        message: 'Citytipe has been Updated Successfully',
        citytipe: res,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Citytipe Update',
        citytipe: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.citytipeService.remove(+id);
      return {
        message: 'Citytipe has been deleted successfully',
      }
    } catch (error) {
      return {
        message: 'No Citytipe deleted',
      }
    }
  }
}
