import React, { Dispatch, createContext, ReactNode, SetStateAction, useState } from 'react';

interface MenuContextProps {
  children: ReactNode;
}

type MenuContextData = {
  activateMenuSideBar: boolean;
  setActivateMenuSideBar: Dispatch<SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

const MenuContextProvider: React.FC<MenuContextProps> = ({ children }) => {
  const [activateMenuSideBar, setActivateMenuSideBar] = useState<boolean>(false);

  const contextData: MenuContextData = {
    activateMenuSideBar,
    setActivateMenuSideBar,
  };

  return <MenuContext.Provider value={contextData}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuContextProvider };
