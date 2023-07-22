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
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @ApiOperation({ summary: 'Create new Province' })
  @ApiOkResponse({
    description: 'success',
    schema: {
      example: {
        message: 'Province has been created successfully',
        province: {
          id: 1,
          oid_province: '12',
          province_name: 'Aceh',
        },
      },
    },
  })
  @ApiConflictResponse({
    description: 'oid is already taken',
    schema: {
      example: {
        message: 'oid is already taken',
        province: null,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        message: [
          {
            property: 'oid_province',
            message: 'oid_province should not be empty',
          },
          {
            property: 'province_name',
            message: 'province_name should not be empty',
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  @Post()
  async create(
    @Body() createProvinceDto: CreateProvinceDto,
    @Res() response: Response,
  ) {
    try {
      // console.log(createProvinceDto)
      const res = await this.provinceService.create(createProvinceDto);
      response.status(HttpStatus.OK).json({
        message: 'Province has been created successfully',
        data: res,
      });
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        response.status(HttpStatus.CONFLICT).json({
          message: 'oid is already taken',
          data: null,
        });
      }
      if (error.status === HttpStatus.BAD_REQUEST) {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            'oid_province should not be empty',
            'province_name should not be empty',
          ],
          error: 'Bad Request',
        });
      }

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
      data: provinceAll ?? [],
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const province = await this.provinceService.findOne(+id);
    return {
      statusCode: 200,
      message: 'success',
      data: province ?? [],
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: {
      example: {
        message: 'Province has been Updated Successfully',
        data: {
          id: 4,
          oid_province: '11',
          province_name: 'ACEHX',
        },
      },
    },
  })
  @Patch(':id')
  @ApiOperation({
    summary: 'Update Province by Id',
    description: 'Updates the name of a province.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              province_name: {
                type: 'string',
                example: 'NEW PROVINCE NAME',
              },
            },
          },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.provinceService.update(+id, updateProvinceDto);
      response.status(HttpStatus.OK).json({
        message: 'Province has been Updated Successfully',
        data: res,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No Province Update',
        data: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.provinceService.remove(+id);
      return {
        message: 'Province has been deleted successfully',
      };
    } catch (error) {
      return {
        message: 'No Province Deleted',
      };
    }
  }
}
