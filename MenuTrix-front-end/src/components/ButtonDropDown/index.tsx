import {
  MainContainerButtonDropDown,
  ButtonDropDownStyled,
  ImgLogo,
  IconArrow,
  ContainerDropDown,
  ButtonConfigs,
  Line,
} from './style';
import LOGORESTAURANTE from '../../assets/img/logoHamburger.png';
import { MdArrowDropDown } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../../contexts/restaurantContext';

export default function ButtonDropDown() {
  const [select, setSelect] = useState<boolean>(false);
  const { restaurant } = useContext(RestaurantContext);
  const { logout } = useContext(AuthContext);
  const { clearRestaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelect(!select);
  };


  return (
    <MainContainerButtonDropDown>
      <ButtonDropDownStyled select={select} onClick={handleSelect}>
        <ImgLogo src={restaurant ? restaurant.photoProfile : LOGORESTAURANTE} />
        <IconArrow>
          <MdArrowDropDown />
        </IconArrow>
      </ButtonDropDownStyled>
      {select && (
        <ContainerDropDown onMouseLeave={handleSelect}>
          <ButtonConfigs onClick={() => navigate('/config/restaurante')}>Restaurante</ButtonConfigs>
          <ButtonConfigs onClick={() => navigate('/config/dados-e-segurança')}>
            Dados e Segurança
          </ButtonConfigs>
          <Line />
          <ButtonConfigs
            onClick={() => {
              logout();
              clearRestaurant();
            }}
          >
            Sair
          </ButtonConfigs>
        </ContainerDropDown>
      )}
    </MainContainerButtonDropDown>
  );
}
