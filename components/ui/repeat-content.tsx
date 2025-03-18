import React from 'react';

interface Props {
   count: number;
}

export const RepeatContent: React.FC<React.PropsWithChildren<Props>> = ({ count = 0, children }) => {
   return [...new Array(count)].map((_, index) => {
      return <React.Fragment key={index}>{children}</React.Fragment>;
   });
};

