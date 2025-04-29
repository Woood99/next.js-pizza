import { z } from 'zod';

const passwordSchema = z.string().min(6, { message: 'Введите пароль' });
const emailSchema = z.string().email({ message: 'Некорректный email' });
const fullNameSchema = z.string().min(10, { message: 'Введите имя и фамилию' });

export const authLoginSchema = z.object({
   email: emailSchema,
   password: passwordSchema,
});

export const authRegisterSchema = z
   .object({
      email: emailSchema,
      fullName: fullNameSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
   })
   .refine(data => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
   });

export type AuthLoginValues = z.infer<typeof authLoginSchema>;
export type AuthRegisterValues = z.infer<typeof authRegisterSchema>;
