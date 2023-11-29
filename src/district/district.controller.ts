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
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

@ApiTags('District / kecamatan')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  @ApiOperation({
    summary: 'create new district',
  })
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
    @Res() response: Response,
  ) {
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
  @ApiOperation({
    summary: 'Get all district',
  })
  // async findAll(@Query() pageOptionsDto: PageOptionsDto) {
  async findAll() {
    const districts = await this.districtService.findAll();
    return {
      statusCode: 200,
      message: 'success',
      data: districts ? [...districts.data] : [],
      // meta: districts ? { ...districts.meta } : null,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get district by id',
  })
  async findOne(@Param('id') id: string) {
    const district = await this.districtService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: district ?? [],
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update dictrict by id',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.districtService.update(+id, updateDistrictDto);
      response.status(HttpStatus.OK).json({
        message: 'District has been Updated Successfully',
        district: res,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No District Update',
        district: null,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete district by id',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.districtService.remove(+id);
      return {
        message: 'District has been deleted successfully',
      };
    } catch (error) {
      return {
        message: 'No District Deleted',
      };
    }
  }

  @Get('search/:name')
  @ApiOperation({
    summary: 'Search District by name',
  })
  async search(
    @Param('name') name: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const districts = await this.districtService.searchByName(
      name,
      pageOptionsDto,
    );
    return {
      statusCode: 200,
      message: 'success',
      data: districts ? [...districts.data] : [],
      meta: districts ? { ...districts.meta } : null,
    };
  }

  @Get('search/oid/:oid_district')
  @ApiOperation({
    summary: 'Search District by Oid',
  })
  async searchByOidDistrict(@Param('oid_district') oid_district: string) {
    const subdistrict = await this.districtService.searchByOidDistrict(
      oid_district,
    );

    return {
      statusCode: 200,
      message: 'success',
      data: subdistrict ? [...subdistrict] : [],
    };
  }
}
