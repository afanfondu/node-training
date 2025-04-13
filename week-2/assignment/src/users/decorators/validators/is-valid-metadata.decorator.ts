import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidMetadata(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidMetadata',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Record<string, string>) {
          if (typeof value !== 'object' || value === null) return false;

          for (const [key, val] of Object.entries(value)) {
            if (!key.match(/^[a-z0-9_]+$/)) {
              return false;
            }

            if (typeof val !== 'string' || val.length > 255) {
              return false;
            }
          }

          return true;
        },
        defaultMessage() {
          return 'INVALID_METADATA';
        },
      },
    });
  };
}
