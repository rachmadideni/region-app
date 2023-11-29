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
  Query,
} from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

@ApiTags('Subdistrict / kelurahan')
@Controller('subdistrict')
export class SubdistrictController {
  constructor(private readonly subdistrictService: SubdistrictService) {}

  @Post()
  @ApiOperation({
    summary: 'create new subdistrict',
  })
  async create(
    @Body() createSubdistrictDto: CreateSubdistrictDto,
    @Res() response: Response,
  ) {
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
  @ApiOperation({
    summary: 'Get all subdistrict',
  })
  // async findAll(@Query() pageOptionsDto: PageOptionsDto) {
  async findAll() {
    // const subdistrictAll = await this.subdistrictService.findAll(
    //   pageOptionsDto,
    // );
    const subdistrictAll = await this.subdistrictService.findAll();
    return {
      statusCode: 200,
      message: 'success',
      data: subdistrictAll ? [...subdistrictAll] : [],
      // data: subdistrictAll ? [...subdistrictAll.data] : [],
      // meta: subdistrictAll ? { ...subdistrictAll.meta } : null,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get subdistrict by id',
  })
  async findOne(@Param('id') id: string) {
    const subdistrict = await this.subdistrictService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: subdistrict ?? [],
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update subdistrict by id',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSubdistrictDto: UpdateSubdistrictDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.subdistrictService.update(
        +id,
        updateSubdistrictDto,
      );
      response.status(HttpStatus.OK).json({
        message: 'Subdistrict has been Updated Successfully',
        subdistrict: res,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Subdistrict Update',
        subdistrict: null,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete subdistrict by id',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.subdistrictService.remove(+id);
      return {
        message: 'Subdistrict has been deleted successfully',
      };
    } catch (error) {
      return {
        message: 'No Subdistrict deleted',
      };
    }
  }

  @Get('search/:name')
  @ApiOperation({
    summary: 'Search subdistrict by name',
  })
  async search(
    @Param('name') name: string,
    @Query() PageOptionsDto: PageOptionsDto,
  ) {
    const subdistrict = await this.subdistrictService.searchByName(
      name,
      PageOptionsDto,
    );
    return {
      statusCode: 200,
      message: 'success',
      data: subdistrict ? [...subdistrict.data] : [],
      meta: subdistrict ? { ...subdistrict.meta } : null,
    };
  }
}
