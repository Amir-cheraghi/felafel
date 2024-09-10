import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // FIXME: At this time because we dont have user auth read user from header to test api or user will be set to 1
    const request = ctx.switchToHttp().getRequest();
    return +(request.header("user-id") as string) || 1;
  },
);
