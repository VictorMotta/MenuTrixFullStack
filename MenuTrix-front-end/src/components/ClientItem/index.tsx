import {
  MainContainer,
  NameInfo,
  ContainerInfoTitle,
  ContainerInfoClient,
  InfoClient,
} from './style';
import { useState } from 'react';
import { ClientRes } from '../../pages/Client';

interface PropsAdditionalItem {
  item: ClientRes;
}

export function ClientItem({ item }: PropsAdditionalItem) {
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  return (
    <MainContainer heightAlter={openInfo} onClick={() => setOpenInfo(!openInfo)}>
      <ContainerInfoTitle>
        <NameInfo>Nome: {item.name.toLocaleLowerCase()}</NameInfo>
        <NameInfo>Tel: {item.telephone}</NameInfo>
      </ContainerInfoTitle>
      <ContainerInfoClient>
        <InfoClient>Email: {item.email}</InfoClient>
        <InfoClient>Endereço de entrega:</InfoClient>
        <InfoClient>
          {item.Address[0].street}, {item.Address[0].numberHouse}, {item.Address[0].neighborhood},{' '}
          {item.Address[0].city}, {item.Address[0].state}
        </InfoClient>
      </ContainerInfoClient>
    </MainContainer>
  );
}
