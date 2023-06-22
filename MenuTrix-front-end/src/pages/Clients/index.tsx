import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar/index';
import { MainContainer, SecondContainer } from './style';
export function Clients() {
  return (
    <MainContainer>
      <TopBar />
      <SecondContainer>
        <SideBar page='clientes' />
      </SecondContainer>
    </MainContainer>
  );
}
