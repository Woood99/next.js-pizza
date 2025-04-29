import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { FormInput } from '@/shared/components/shared/form-components';

interface Props {
   className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
   return (
      <WhiteBlock className={cn(className)} title="2. Персональные данные">
         <div className="grid grid-cols-2 gap-3">
            <FormInput name="firstName" placeholder="Имя" />
            <FormInput name="lastName" placeholder="Фамилия" />
            <FormInput name="email" placeholder="E-Mail" />
            <FormInput name="phone" placeholder="Телефон" />
         </div>
      </WhiteBlock>
   );
};
