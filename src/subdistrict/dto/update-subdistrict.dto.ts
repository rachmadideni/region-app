import { PartialType } from '@nestjs/mapped-types';
import { CreateSubdistrictDto } from './create-subdistrict.dto';

export class UpdateSubdistrictDto extends PartialType(CreateSubdistrictDto) {}
