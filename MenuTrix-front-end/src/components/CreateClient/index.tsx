import React, { FormEvent, useCallback, useState } from 'react';
import {
  Button,
  ButtonsContainer,
  ContainerColumn,
  ContentContainer,
  FormContainer,
  Input,
  InputContainer,
  Label,
  MainContainer,
  TitleInputs,
  TopContainer,
} from './style';
import { toast } from 'react-toastify';
import { createClient } from '../../services/clientApi';
import useToken from '../../hooks/useToken';
import { ClientRes } from '../../pages/Client';

export interface ClientBody {
  name: string;
  email: string;
  telephone: string;
  Address: {
    street: string;
    numberHouse: string;
    neighborhood: string;
    city: string;
    state: string;
    complement?: string;
  };
}

interface PropsCreateClient {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  clients: ClientRes[];
  setClients: React.Dispatch<React.SetStateAction<ClientRes[]>>;
}

export function CreateClient({ setSelected, clients, setClients }: PropsCreateClient) {
  const token = useToken();
  const [newClient, setNewClient] = useState<ClientBody>({
    name: '',
    email: '',
    telephone: '',
    Address: {
      street: '',
      numberHouse: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
    },
  } as ClientBody);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (newClient.Address.complement === '') {
        delete newClient.Address.complement;
      }
      const response = await createClient(token, newClient);
      setClients([...clients, response]);
      setSelected(false);
      toast.success('Criado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao criar um novo cliente!');
    }
  }

  const editPersonalInfo = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setNewClient({ ...newClient, [e.currentTarget.name]: e.currentTarget.value });
    },
    [newClient]
  );

  const editAddressInfo = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setNewClient({
        ...newClient,
        Address: { ...newClient.Address, [e.currentTarget.name]: e.currentTarget.value },
      });
    },
    [newClient]
  );

  return (
    <MainContainer>
      <TopContainer>Criar Cliente</TopContainer>
      <FormContainer onSubmit={handleSubmit}>
        <ContentContainer>
          <ContainerColumn>
            <InputContainer>
              <Label htmlFor='name'>Nome</Label>
              <Input
                name='name'
                id='name'
                value={newClient.name}
                onChange={editPersonalInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                name='email'
                id='email'
                value={newClient.email}
                onChange={editPersonalInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='telephone'>Telefone</Label>
              <Input
                name='telephone'
                id='telephone'
                value={newClient.telephone}
                onChange={editPersonalInfo}
                required
              />
            </InputContainer>
          </ContainerColumn>
          <ContainerColumn>
            <TitleInputs>Endereço</TitleInputs>
            <InputContainer>
              <Label htmlFor='street'>Rua</Label>
              <Input
                name='street'
                id='street'
                value={newClient.Address.street}
                onChange={editAddressInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='numberHouse'>Número da Casa</Label>
              <Input
                name='numberHouse'
                id='numberHouse'
                value={newClient.Address.numberHouse}
                onChange={editAddressInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='neighborhood'>Bairro</Label>
              <Input
                name='neighborhood'
                id='neighborhood'
                value={newClient.Address.neighborhood}
                onChange={editAddressInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='city'>Cidade</Label>
              <Input
                name='city'
                id='city'
                value={newClient.Address.city}
                onChange={editAddressInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='state'>Estado</Label>
              <Input
                name='state'
                id='state'
                value={newClient.Address.state}
                onChange={editAddressInfo}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='complement'>Complemento</Label>
              <Input
                name='complement'
                id='complement'
                value={newClient.Address.complement}
                onChange={editAddressInfo}
                placeholder='(opcional)'
              />
            </InputContainer>
          </ContainerColumn>
        </ContentContainer>
        <ButtonsContainer>
          <Button type='submit'>Criar</Button>
          <Button onClick={() => setSelected(false)}>Cancelar</Button>
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
}
