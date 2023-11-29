import { IsNotEmpty, IsString } from 'class-validator';
export class CreateDistrictDto {
  /**
   * Object Id of district
   * @example 1101010
   */
  @IsNotEmpty()
  @IsString()
  oid_district: string;

  /**
   * Object Id of city
   * @example 1101
   */
  @IsNotEmpty()
  @IsString()
  oid_city: string;

  /**
   * District name
   * @example Teupah Selatan
   */
  @IsNotEmpty()
  @IsString()
  district_name: string;
}
