import { z } from 'zod';

export const checkoutSchema = z.object({
   firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
   lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
   email: z.string().email({ message: 'Некорректный email' }),
   phone: z.string().min(10, { message: 'Некорректный номер телефона' }),
   address: z.string().min(5, { message: 'Некорректная адрес' }),
   comment: z.string().optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
