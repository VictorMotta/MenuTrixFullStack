import { useContext } from 'react';
import {
  ButtonMenu,
  ContainerButtons,
  ContainerLinkSell,
  ContainerLinkSellInfo,
  IconButton,
  LinkSell,
  MainContainerSideBar,
  NameButton,
  ButtonCopy,
} from './style';
import {
  MdRequestQuote,
  MdFastfood,
  MdEgg,
  MdGroups,
  MdPaid,
  MdInventory,
  MdFileCopy,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../../contexts/restaurantContext';
import { MenuContext } from '../../contexts/menuContext';

interface SideBarProps {
  page: string;
}
export default function SideBar({ page }: SideBarProps) {
  const { activateMenuSideBar } = useContext(MenuContext);
  const { restaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();
  return (
    <MainContainerSideBar activate={activateMenuSideBar}>
      <ContainerButtons>
        <ButtonMenu select={page === 'pedidos' && true} onClick={() => navigate('/pedidos')}>
          <IconButton>
            <MdRequestQuote />
          </IconButton>
          <NameButton>Pedidos</NameButton>
        </ButtonMenu>
        <ButtonMenu select={page === 'produtos' && true} onClick={() => navigate('/produtos')}>
          <IconButton>
            <MdFastfood />
          </IconButton>
          <NameButton>Produtos</NameButton>
        </ButtonMenu>
        <ButtonMenu select={page === 'adicionais' && true} onClick={() => navigate('/adicionais')}>
          <IconButton>
            <MdEgg />
          </IconButton>
          <NameButton>Adicionais</NameButton>
        </ButtonMenu>
        <ButtonMenu select={page === 'clientes' && true} onClick={() => navigate('/clientes')}>
          <IconButton>
            <MdGroups />
          </IconButton>
          <NameButton>Clientes</NameButton>
        </ButtonMenu>
        <ButtonMenu select={page === 'financeiro' && true} onClick={() => navigate('/financeiro')}>
          <IconButton>
            <MdPaid />
          </IconButton>
          <NameButton>Financeiro</NameButton>
        </ButtonMenu>
        <ButtonMenu select={page === 'estoque' && true} onClick={() => navigate('/estoque')}>
          <IconButton>
            <MdInventory />
          </IconButton>
          <NameButton>Estoque</NameButton>
        </ButtonMenu>
      </ContainerButtons>
      <ContainerLinkSellInfo>
        <h1>Link de venda:</h1>
        <ContainerLinkSell>
          <LinkSell to='#'>www.menutrix/{restaurant?.nameParamSite}</LinkSell>
          <ButtonCopy>
            <MdFileCopy />
          </ButtonCopy>
        </ContainerLinkSell>
      </ContainerLinkSellInfo>
    </MainContainerSideBar>
  );
}
