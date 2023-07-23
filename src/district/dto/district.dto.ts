import { PartialType } from '@nestjs/mapped-types';
import { CreateDistrictDto } from './create-district.dto';

export class DistrictDto extends PartialType(CreateDistrictDto) {}
