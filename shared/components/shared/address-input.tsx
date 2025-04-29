import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
   onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
   return (
      <AddressSuggestions
         token="29cf02884714137a391e4e66911a9126cd8d09f2"
         onChange={data => onChange?.(data?.value)}
         uid="dadata-address-order-page"
         count={5}
      />
   );
};

// interface Props {
//    onChange?: (value?: []) => void;
// }

// export const AddressInput: React.FC<Props> = ({ onChange }) => {
//    const [value, setValue] = useState<string>('');

//    const fetch = async (body: { count: number; query: string }) => {
//       const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
//       const token = '29cf02884714137a391e4e66911a9126cd8d09f2';
//       try {
//          const data = await axiosInstance.post(url, body, {
//             headers: {
//                Authorization: 'Token ' + token,
//             },
//          });
//          onChange?.(data.data.suggestions);
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    useDebounce(
//       async () => {
//          try {
//             if (!value) return;
//             const body = { count: 10, query: value };
//             fetch(body);
//          } catch (error) {}
//       },
//       350,
//       [value]
//    );

//    return <Input placeholder="Адрес доставки" onChange={e => setValue(e.target.value)} />;
// };
