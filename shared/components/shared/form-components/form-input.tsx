import React from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   required?: boolean;
   className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
   const {
      register,
      formState: { errors },
      watch,
      setValue,
   } = useFormContext();

   const value = watch(name);
   const errorText = errors[name]?.message as string;

   const onClickClear = () => {
      setValue(name, '', { shouldValidate: true });
   };

   return (
      <div className={cn(className)}>
         {label && (
            <p className="font-medium mb-2">
               {label} {required && <RequiredSymbol />}
            </p>
         )}

         <div className="relative">
            <Input className="h-12" {...register(name)} {...props} />
            {Boolean(value) && <ClearButton onClick={onClickClear} />}
         </div>
         {Boolean(errorText) && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
