import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Props {
   description: string;
   amount: number;
   orderId: number;
}

export const createPayment = async (details: Props) => {
   const { data } = await axios.post<PaymentData>(
      'https://api.yookassa.ru/v3/payments',
      {
         amount: {
            value: details.amount,
            currency: 'RUB',
         },
         capture: true,
         description: details.description,
         metadata: {
            order_id: details.orderId,
         },
         confirmation: {
            type: 'redirect',
            return_url: process.env.YOOMONEY_CALLBACK_URL as string,
         },
      },
      {
         auth: {
            username: process.env.YOOMONEY_SHOP_ID as string, // ID магазина
            password: process.env.YOOMONEY_SECRET_KEY as string, // Секретный ключ
         },
         headers: {
            'Idempotence-Key': uuidv4(),
         },
      }
   );
   console.log(data);
   
   return data;
};
