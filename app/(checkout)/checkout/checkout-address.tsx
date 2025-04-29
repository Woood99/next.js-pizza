'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { FormTextarea } from '@/shared/components/shared/form-components/form-textarea';
import { AddressInput } from '@/shared/components/shared/address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '@/shared/components/shared/error-text';

interface Props {
   className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
   const { control } = useFormContext();

   return (
      <WhiteBlock className={cn(className)} title="2. Адрес доставки">
         <div className="flex flex-col gap-3">
            <Controller
               control={control}
               name="address"
               render={({ field, fieldState }) => (
                  <div>
                     <AddressInput onChange={field.onChange} />
                     {fieldState.error?.message && <ErrorText text={fieldState.error.message} className="mt-2" />}
                  </div>
               )}
            />
            <FormTextarea rows={5} name="comment" className="text-base" placeholder="Комментарий к заказу" />
         </div>
      </WhiteBlock>
   );
};
