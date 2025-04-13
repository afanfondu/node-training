import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractHeaders = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (data) return request.headers[data.toLowerCase()];
    return request.headers;
  },
);
