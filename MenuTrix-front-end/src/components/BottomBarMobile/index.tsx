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
  children?: ReactNode;
}

export default function BottomBarMobile({
  children
}: BottomBarMobileProps) {
  const { activateMenuSideBar, activeMenuSideBarConfig, resetDados, openAndCloseMenu, openAndCloseMenuConfig } = useContext(MenuContext);

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
        {activeMenuSideBarConfig ? (
          <IconClose onClick={openAndCloseMenuConfig} />
        ) : (
          <IconConfig onClick={openAndCloseMenuConfig} />
        )}
      </ThirdContainerButtons>
    </MainContainer>
  );
}
