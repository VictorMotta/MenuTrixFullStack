import React, { Dispatch, createContext, ReactNode, SetStateAction, useState } from 'react';

interface MenuContextProps {
  children: ReactNode;
}

type MenuContextData = {
  activateMenuSideBar: boolean;
  setActivateMenuSideBar: Dispatch<SetStateAction<boolean>>;
  activeMenuSideBarConfig: boolean;
  setActiveMenuSideBarConfig: Dispatch<SetStateAction<boolean>>;
  resetDados: () => any;
};

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

const MenuContextProvider: React.FC<MenuContextProps> = ({ children }) => {
  const [activateMenuSideBar, setActivateMenuSideBar] = useState<boolean>(false);
  const [activeMenuSideBarConfig, setActiveMenuSideBarConfig] = useState<boolean>(false);

  const resetDados = () => {
    setActivateMenuSideBar(false);
    setActiveMenuSideBarConfig(false);
  }

  const contextData: MenuContextData = {
    activateMenuSideBar,
    setActivateMenuSideBar,
    activeMenuSideBarConfig,
    setActiveMenuSideBarConfig,
    resetDados,
  };

  return <MenuContext.Provider value={contextData}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuContextProvider };
