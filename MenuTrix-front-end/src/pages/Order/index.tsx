import { useState } from 'react';
import SideBar from '../../components/SideBar';
import {
  ButtonCreate,
  ContainerCreateFilter,
  ContentContainer,
  MainContainer,
  SecondContainer,
} from './style';
import { MdAddCircle } from 'react-icons/md';
import { CreateOrder } from '../../components/CreateOrder';
import BottomBarMobile from '../../components/BottomBarMobile';

export function Order() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='pedidos' />
          <ContentContainer>
            <ContainerCreateFilter>
              {!openCreate ? (
                <>
                  <ButtonCreate onClick={() => setOpenCreate(true)}>
                    <MdAddCircle />
                    <h1>Criar</h1>
                  </ButtonCreate>
                </>
              ) : (
                <CreateOrder
                  setOpenCreate={setOpenCreate}
                  setLoadingPage={setLoadingPage}
                  loadingPage={loadingPage}
                />
              )}
            </ContainerCreateFilter>
          </ContentContainer>
        </SecondContainer>
      </MainContainer>
      <BottomBarMobile></BottomBarMobile>
    </>
  );
}
