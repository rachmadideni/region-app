import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSubdistrictDto {
  /**
   * Object Id of subdistrict
   * @example 1102043006
   */
  @IsNotEmpty()
  @IsString()
  oid_subdistrict: string;

  /**
   * Object Id of district
   * @example 11020431
   */
  @IsNotEmpty()
  @IsString()
  oid_district: string;

  /**
   * Subdistrict name
   * @example Lhoknga
   */
  @IsNotEmpty()
  @IsString()
  subdistrict_name: string;

  /**
   * Post code
   * @example 23352
   */
  @IsNotEmpty()
  @IsString()
  post_code: string;
}
