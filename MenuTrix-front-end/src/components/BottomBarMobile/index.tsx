import { ReactNode, useContext, useEffect } from 'react';
import {
  FirstContainerButtons,
  IconClose,
  IconConfig,
  IconFilter,
  IconMagnifyingGlass,
  IconMenu,
  MainContainer,
  SecondContainerButtons,
  ThirdContainerButtons,
} from './style';
import { MenuContext } from '../../contexts/menuContext';

interface BottomBarMobileProps {
  searchActivate: boolean;
  openAndCloseMenu: () => any;
  openAndCloseMenuConfig: () => any;
  children: ReactNode;
}

export default function BottomBarMobile({
  searchActivate,
  openAndCloseMenu,
  openAndCloseMenuConfig,
  children
}: BottomBarMobileProps) {
  const { activateMenuSideBar, activeMenuSideBarConfig, resetDados } = useContext(MenuContext);

  useEffect(() => {
    resetDados();
  }, [])


  return (
    <MainContainer>
      <FirstContainerButtons>
        {activateMenuSideBar ? (
          <IconClose onClick={openAndCloseMenu} />
        ) : (
          <IconMenu onClick={openAndCloseMenu} />
        )}
      </FirstContainerButtons>
      <SecondContainerButtons>
        {children}
      </SecondContainerButtons>
      <ThirdContainerButtons>
        <IconMagnifyingGlass activateMGlass={searchActivate} />
        <IconFilter />
        {activeMenuSideBarConfig ? (
          <IconClose onClick={openAndCloseMenuConfig} />
        ) : (
          <IconConfig onClick={openAndCloseMenuConfig} />
        )}
      </ThirdContainerButtons>
    </MainContainer>
  );
}
