import type { z } from 'zod';
import type { authSchemaRequest, authSchemaResponse } from '~/schemas/auth';

export type LoginRequest = z.infer<typeof authSchemaRequest.login>;
export type RegisterRequest = z.infer<typeof authSchemaRequest.register>;
export type RefreshRequest = z.infer<typeof authSchemaRequest.refresh>;
export type LogoutRequest = z.infer<typeof authSchemaRequest.logout>;

export type LoginResponse = z.infer<typeof authSchemaResponse.login>;
export type RegisterResponse = z.infer<typeof authSchemaResponse.register>;
export type RefreshResponse = z.infer<typeof authSchemaResponse.refresh>;
export type LogoutResponse = z.infer<typeof authSchemaResponse.logout>;
