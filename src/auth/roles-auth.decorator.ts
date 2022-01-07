import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

export const Roles = (...roles: number[]) => SetMetadata(ROLE_KEY, roles); // add custom decorator
