import { z } from 'zod';

const loginRequestSchema = z.object({
  usernameOrEmail: z.string().refine((val) => {
    if (val.includes('@') && val.includes('.')) {
      return z.string().email('Enter a valid email');
    } else {
      return z
        .string()
        .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Enter a valid phone number');
    }
  }),
  password: z.string().min(6),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const registerResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const refreshRequestSchema = z.object({});

const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const logoutRequestSchema = z.object({});

const logoutResponseSchema = z.object({
  message: z.string(),
});

export const authSchemaRequest = {
  login: loginRequestSchema,
  register: registerRequestSchema,
  refresh: refreshRequestSchema,
  logout: logoutRequestSchema,
};

export const authSchemaResponse = {
  login: loginResponseSchema,
  register: registerResponseSchema,
  refresh: refreshResponseSchema,
  logout: logoutResponseSchema,
};
