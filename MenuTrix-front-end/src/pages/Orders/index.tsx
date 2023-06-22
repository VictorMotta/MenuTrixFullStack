import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar/index';
import { MainContainer, SecondContainer } from './style';
export function Orders() {
  return (
    <MainContainer>
      <TopBar />
      <SecondContainer>
        <SideBar page='pedidos' />
      </SecondContainer>
    </MainContainer>
  );
}
