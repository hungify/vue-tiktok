import z from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(6, {
      message: 'Email must be at least 6 characters',
    })
    .email({
      message: 'Email must be a valid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});
