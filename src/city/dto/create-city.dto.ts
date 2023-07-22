import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export enum EnumCityType {
  KOTA = 1,
  KABUPATEN = 2,
}
export class CreateCityDto {
  /**
   * Object Id of city
   * @example 1301
   */

  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  oid_city: string;

  /**
   * Name of city
   * @example Kab. Mamuju
   */

  @IsNotEmpty()
  @IsString()
  city_name: string;

  /**
   * Object Id of province
   * @example 13
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  oid_province: string;

  /**
   * Object Id of city type
   * @example 1 = kota, 2 = kabupaten
   */
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(EnumCityType)
  oid_cititype: EnumCityType;
}
