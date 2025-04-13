import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidPostalCode(
  country: 'US' | 'UK' | 'IN',
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPostalCode',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const patterns = {
            US: /^\d{5}$/,
            UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
            IN: /^\d{6}$/,
          };
          return patterns[country]?.test(value);
        },
        defaultMessage() {
          return `${propertyName} INVALID_POSTAL_CODE`;
        },
      },
    });
  };
}
