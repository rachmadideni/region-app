import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateApiKeyDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'the name of consumer',
  })
  @IsNotEmpty()
  name: string;
}
