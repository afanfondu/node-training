import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidHourlyRate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidHourlyRate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, args: ValidationArguments) {
          const countryCode = 'US'; // should come from header

          const rateRanges = {
            US: { min: 20, max: 100 },
            EU: { min: 15, max: 80 },
          };

          const range = rateRanges[countryCode] || rateRanges['US'];

          return (
            typeof value === 'number' &&
            value >= range.min &&
            value <= range.max
          );
        },
        defaultMessage(args: ValidationArguments) {
          const countryCode = 'US';

          const rateRanges = {
            US: { min: 20, max: 100 },
            EU: { min: 15, max: 80 },
          };

          const range = rateRanges[countryCode] || rateRanges['US'];
          return `RATE_OUT_OF_RANGE:${countryCode}:${range.min}:${range.max}`;
        },
      },
    });
  };
}
