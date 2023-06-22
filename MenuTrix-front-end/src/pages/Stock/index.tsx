import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar/index';
import { ContentContainer, MainContainer, SecondContainer } from './style';
export function Estoque() {
  return (
    <MainContainer>
      <TopBar />
      <SecondContainer>
        <SideBar page='estoque' />
        <ContentContainer>
          <div>Em Breve</div>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
