import { useContext } from 'react';
import { ButtonsSideBarConfig, Line, MainContainer } from './style';
import { MenuContext } from '../../contexts/menuContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { RestaurantContext } from '../../contexts/restaurantContext';

interface SideBarConfig {

}

export default function SideBarConfig({ }: SideBarConfig) {
  const { activeMenuSideBarConfig } = useContext(MenuContext);
  const { logout } = useContext(AuthContext);
  const { clearRestaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();

  return (
    <MainContainer activateMenu={activeMenuSideBarConfig}>
      <ButtonsSideBarConfig onClick={() => navigate('/config/restaurante')}>Restaurante</ButtonsSideBarConfig>
      <ButtonsSideBarConfig onClick={() => navigate('/config/dados-e-segurança')}>Dados e Segurança</ButtonsSideBarConfig>
      <Line></Line>
      <ButtonsSideBarConfig
        onClick={() => {
          logout();
          clearRestaurant();
        }}
      >
        Sair
      </ButtonsSideBarConfig>
    </MainContainer >
  );
}