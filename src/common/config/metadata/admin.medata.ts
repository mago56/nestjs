import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN = 'isAdmin';

export const Admin = () => SetMetadata(IS_ADMIN, true);