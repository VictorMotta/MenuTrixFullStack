import { useContext, useState } from 'react';
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
import { MenuContext } from '../../contexts/menuContext';
import SideBarConfig from '../../components/SideBarConfig';
import { ButtonSquareCreate, IconPlusSquareCreate } from '../../components/BottomBarMobile/style';

export function Order() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [alterButtonMenu, setAlterButtonMenu] = useState<boolean>(false);

  const {
    activateMenuSideBar,
    setActivateMenuSideBar,
    activeMenuSideBarConfig,
    setActiveMenuSideBarConfig
  } = useContext(MenuContext);

  function openAndCloseMenu() {
    setAlterButtonMenu(!alterButtonMenu);
    setActiveMenuSideBarConfig(false);
    setActivateMenuSideBar(!activateMenuSideBar);
  }

  function openAndCloseMenuConfig() {
    setActiveMenuSideBarConfig(!activeMenuSideBarConfig);
    setActivateMenuSideBar(false);
    setAlterButtonMenu(!alterButtonMenu);
  }

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
      <BottomBarMobile searchActivate={false} openAndCloseMenu={openAndCloseMenu} openAndCloseMenuConfig={openAndCloseMenuConfig} >
        <ButtonSquareCreate hidden={alterButtonMenu}>
          <IconPlusSquareCreate />
        </ButtonSquareCreate>
      </BottomBarMobile>
      <SideBarConfig />
    </>
  );
}
