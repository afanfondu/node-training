// timeout decorator
import { RequestTimeoutException } from '@nestjs/common';

export const Timeout = (delay: number): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    let timeoutId: NodeJS.Timeout;

    descriptor.value = async function (...args: any[]) {
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new RequestTimeoutException()),
          delay,
        );
      });

      try {
        const result = await Promise.race([
          originalMethod.apply(this, args),
          timeoutPromise,
        ]);
        return result;
      } finally {
        clearTimeout(timeoutId);
      }
    };
    return descriptor;
  };
};
