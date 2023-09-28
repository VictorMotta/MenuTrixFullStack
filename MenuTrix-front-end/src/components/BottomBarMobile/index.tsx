import { MdMenu } from 'react-icons/md';
import {
  ButtonSquareCreate,
  FirstContainerButtons,
  IconClose,
  IconConfig,
  IconFilter,
  IconMagnifyingGlass,
  IconMenu,
  IconPlusSquareCreate,
  MainContainer,
  SecondContainerButtons,
  ThirdContainerButtons,
} from './style';
import { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

interface PropsBottomBarMobile {
  activateMenuSideBar: boolean;
}

export default function BottomBarMobile() {
  const { activateMenuSideBar, setActivateMenuSideBar } = useContext(MenuContext);

  function openAndCloseMenu() {
    setActivateMenuSideBar(!activateMenuSideBar);
  }
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
        <ButtonSquareCreate hidden={activateMenuSideBar}>
          <IconPlusSquareCreate />
        </ButtonSquareCreate>
      </SecondContainerButtons>
      <ThirdContainerButtons>
        <IconMagnifyingGlass />
        <IconFilter />
        <IconConfig />
      </ThirdContainerButtons>
    </MainContainer>
  );
}
