import { PartialType } from '@nestjs/mapped-types';
import { CreateSubdistricttypeDto } from './create-subdistricttype.dto';

export class UpdateSubdistricttypeDto extends PartialType(CreateSubdistricttypeDto) {}
