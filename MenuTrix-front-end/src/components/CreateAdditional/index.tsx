import { FormEvent, useCallback, useState } from 'react';
import {
  Button,
  ButtonsContainer,
  ContentContainer,
  FormContainer,
  Input,
  InputContainer,
  Label,
  MainContainer,
  TopContainer,
} from './style';
import { toast } from 'react-toastify';
import { createAdditional } from '../../services/additionalApi';
import useToken from '../../hooks/useToken';
import { currency } from '../../functions/masks';

interface PropsCreateAdditional {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AdditionalBody {
  nameAdditional: string;
  priceAdditional: string;
}

export function CreateAdditional({
  setSelected,
  loadingPage,
  setLoadingPage,
}: PropsCreateAdditional) {
  const token = useToken();
  const [newAdditional, setNewAdditional] = useState<AdditionalBody>({} as AdditionalBody);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const price = convertCents(newAdditional.priceAdditional);
      const body = {
        nameAdditional: newAdditional.nameAdditional,
        priceAdditional: price,
      };
      await createAdditional(token, body);
      setLoadingPage(!loadingPage);
      setSelected(false);
      toast.success('Adicional criado!');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar criar um novo adicional!');
    }
  }

  function convertCents(value: string) {
    const numberFloat = parseInt(value.replace(/\./g, '').replace(',', '.'));
    const cents = numberFloat * 100;
    return cents;
  }

  const editNewAdditional = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      let formattedValue = value;

      if (name === 'priceAdditional') {
        formattedValue = currency(e);
      }

      const newInfo = { ...newAdditional, [name]: formattedValue };
      setNewAdditional(newInfo);
    },
    [newAdditional]
  );

  return (
    <MainContainer>
      <TopContainer>Criar Adicional</TopContainer>
      <FormContainer onSubmit={handleSubmit}>
        <ContentContainer>
          <InputContainer>
            <Label htmlFor='nameAdditional'>Nome</Label>
            <Input
              name='nameAdditional'
              id='nameAdditional'
              value={newAdditional.nameAdditional}
              onChange={editNewAdditional}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor='priceAdditional'>Valor</Label>
            <Input
              name='priceAdditional'
              id='priceAdditional'
              value={newAdditional.priceAdditional}
              onChange={editNewAdditional}
            />
          </InputContainer>
        </ContentContainer>
        <ButtonsContainer>
          <Button type='submit'>Criar</Button>
          <Button onClick={() => setSelected(false)}>Cancelar</Button>
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
}
