import { useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import { MenuContext } from '../../contexts/menuContext';
import { ContentContainer, MainContainer, SecondContainer } from './style';
import BottomBarMobile from '../../components/BottomBarMobile';
import { ButtonSquareCreate, IconPlusSquareCreate } from '../../components/BottomBarMobile/style';
import SideBarConfig from '../../components/SideBarConfig';
export function Estoque() {

  const { alterButtonMenu, resetDados } = useContext(MenuContext);

  useEffect(() => {
    resetDados();
  }, []);

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='estoque' />
          <ContentContainer>
            <div>Em Breve</div>
          </ContentContainer>
        </SecondContainer>
      </MainContainer>
      <BottomBarMobile >
        {/* <ButtonSquareCreate hidden={alterButtonMenu}>
          <IconPlusSquareCreate />
        </ButtonSquareCreate> */}
      </BottomBarMobile>
      <SideBarConfig />
    </>
  );
}
