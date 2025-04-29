import React from 'react';

interface Props {
   orderId: number;
   totalAmount: number;
   paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
   return (
      <div>
         <h1>Заказ #{orderId}</h1>
         <div>
            <p>Оплатите заказ на сумму {totalAmount} ₽.</p>
            <p>
               Перейдите по{' '}
               <a href={paymentUrl} className="text-blue-500 font-medium">
                  ссылке
               </a>{' '}
               для оплаты заказа.
            </p>
         </div>
      </div>
   );
};
