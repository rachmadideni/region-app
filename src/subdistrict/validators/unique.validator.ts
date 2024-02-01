import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SubdistrictService } from '../subdistrict.service';

// https://stackoverflow.com/questions/75660359/how-to-add-unique-field-validation-in-nest-js-with-class-validator

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueFieldValidator implements ValidatorConstraintInterface {
  constructor(private readonly subdistrictService: SubdistrictService) {}
  validate = async (
    value: any,
    args?: ValidationArguments,
  ): Promise<boolean> => {
    const [_entityClass, fieldName] = args.constraints;
    const entity = await this.subdistrictService.findByFieldValue({
      [fieldName]: value,
    });
    return !entity;
  };
  defaultMessage(args: ValidationArguments): string {
    const [_entityClass, fieldName] = args.constraints;
    return `${fieldName} must be unique`;
  }
}
