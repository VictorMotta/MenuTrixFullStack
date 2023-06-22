import { toast } from 'react-toastify';
import { MainContainer, TitleAdditional } from './style';
import { Switch } from '@nextui-org/react';
import { alterAvailableAdditional } from '../../services/additionalApi';
import useToken from '../../hooks/useToken';
import React, { Dispatch } from 'react';
import { AdditionalRes } from '../../pages/Additional';

interface PropsAdditionalItem {
  item: {
    id?: number;
    name: string;
    price: number;
    isAvailable: boolean;
  };
  additionals: AdditionalRes[];
  setAdditionals: Dispatch<React.SetStateAction<AdditionalRes[]>>;
}

export function AdditionalItem({ item, additionals, setAdditionals }: PropsAdditionalItem) {
  const token = useToken();
  const valueCents = String(item.price);
  let checked = item.isAvailable;
  let price = valueCents.replace(/\D/g, '');
  price = price.replace(/(\d)(\d{2})$/, '$1,$2');
  price = price.replace(/(?=(\d{3})+(\D))\B/g, '.');

  async function alterAvailable() {
    const body = {
      isAvailable: !item.isAvailable,
    };
    try {
      const result = await alterAvailableAdditional(token, item.id, body);
      const newArr = additionals.map((item) => {
        if (item.id === result.id) {
          return result;
        }
        return item;
      });

      setAdditionals(newArr);
    } catch (error) {
      checked = item.isAvailable;
      toast.error('Erro ao tentar deixar indisponível, Tente recarregar a pagina!');
    }
  }

  return (
    <MainContainer onClick={alterAvailable}>
      <TitleAdditional>{item.name.toLocaleLowerCase()}</TitleAdditional>
      <TitleAdditional>R$: {price}</TitleAdditional>
      <Switch bordered color='success' checked={checked} />
    </MainContainer>
  );
}
