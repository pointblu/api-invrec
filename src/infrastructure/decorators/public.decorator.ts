import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Set In Metadata Is Public For endpoints whose does not need Token
 * @returns SetMetadata
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
