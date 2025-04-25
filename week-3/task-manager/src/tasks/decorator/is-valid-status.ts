import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export function IsValidStatus(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            Object.values(TaskStatus).includes(value as TaskStatus)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid status: ${Object.values(TaskStatus).join(', ')}`;
        },
      },
    });
  };
}
