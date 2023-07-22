import { IsNotEmpty } from 'class-validator';
export class CreateProvinceDto {
  /**
   * Object Id of province
   * @example 13
   */
  @IsNotEmpty()
  oid_province: string;
  /**
   * Name of province
   * @example Sulawesi Barat
   */
  @IsNotEmpty()
  province_name: string;
}
