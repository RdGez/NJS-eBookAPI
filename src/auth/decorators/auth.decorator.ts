import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
