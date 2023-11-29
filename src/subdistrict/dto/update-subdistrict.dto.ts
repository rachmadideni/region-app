import { PartialType } from '@nestjs/swagger';
import { CreateSubdistrictDto } from './create-subdistrict.dto';

export class UpdateSubdistrictDto extends PartialType(CreateSubdistrictDto) {}
