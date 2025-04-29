import React from 'react';
import { InfoBlock } from '@/shared/components/shared/info-block';

const UnauthorizedPage = () => {
   return (
      <div className="flex flex-col items-center justify-center mt-40">
         <InfoBlock title="Доптуп запрещён" text="Данную страницу могут просматривать только авторизированные пользователи" />
      </div>
   );
};

export default UnauthorizedPage;
