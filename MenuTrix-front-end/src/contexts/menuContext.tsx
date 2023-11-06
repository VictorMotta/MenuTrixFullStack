import React, { Dispatch, createContext, ReactNode, SetStateAction, useState, useEffect } from 'react';

interface MenuContextProps {
  children: ReactNode;
}

type MenuContextData = {
  activateMenuSideBar: boolean;
  setActivateMenuSideBar: Dispatch<SetStateAction<boolean>>;
  activeMenuSideBarConfig: boolean;
  setActiveMenuSideBarConfig: Dispatch<SetStateAction<boolean>>;
  alterButtonMenu: boolean;
  setAlterButtonMenu: Dispatch<SetStateAction<boolean>>;
  resetDados: () => any;
  openAndCloseMenu: () => any;
  openAndCloseMenuConfig: () => any;
};

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

const MenuContextProvider: React.FC<MenuContextProps> = ({ children }) => {
  const [activateMenuSideBar, setActivateMenuSideBar] = useState<boolean>(false);
  const [activeMenuSideBarConfig, setActiveMenuSideBarConfig] = useState<boolean>(false);
  const [alterButtonMenu, setAlterButtonMenu] = useState<boolean>(false);


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

  const resetDados = () => {
    setActivateMenuSideBar(false);
    setActiveMenuSideBarConfig(false);
    setAlterButtonMenu(false);
  }


  const contextData: MenuContextData = {
    activateMenuSideBar,
    setActivateMenuSideBar,
    activeMenuSideBarConfig,
    setActiveMenuSideBarConfig,
    resetDados,
    openAndCloseMenu,
    openAndCloseMenuConfig,
    alterButtonMenu,
    setAlterButtonMenu
  };

  return <MenuContext.Provider value={contextData}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuContextProvider };
