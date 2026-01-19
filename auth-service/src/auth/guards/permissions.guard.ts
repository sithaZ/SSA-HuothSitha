import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMS_KEY } from "../decorators/permissions.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    
    const requiredPerms = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredPerms) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const userPerms: string[] = req.user?.permissions ?? [];
    return requiredPerms.every((p) => userPerms.includes(p));
  }
}