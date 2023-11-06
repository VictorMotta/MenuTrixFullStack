import { useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import { ContentContainer, MainContainer, SecondContainer } from './style';
import { MenuContext } from '../../contexts/menuContext';
import BottomBarMobile from '../../components/BottomBarMobile';
import { ButtonSquareCreate, IconPlusSquareCreate } from '../../components/BottomBarMobile/style';
import SideBarConfig from '../../components/SideBarConfig';
export function Financial() {

  const { resetDados } = useContext(MenuContext);

  useEffect(() => {
    resetDados();
  }, []);

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='financeiro' />
          <ContentContainer>
            <div>Em Breve</div>
          </ContentContainer>
        </SecondContainer>
      </MainContainer>
      <BottomBarMobile />
      <SideBarConfig />
    </>
  );
}
