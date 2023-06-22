import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar/index';
import { ContentContainer, MainContainer, SecondContainer } from './style';
export function Financial() {
  return (
    <MainContainer>
      <TopBar />
      <SecondContainer>
        <SideBar page='financeiro' />
        <ContentContainer>
          <div>Em Breve</div>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
