import { PartialType } from '@nestjs/mapped-types';
import { CreateCitytipeDto } from './create-citytipe.dto';

export class UpdateCitytipeDto extends PartialType(CreateCitytipeDto) {}
