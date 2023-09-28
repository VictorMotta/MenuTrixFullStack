import SideBar from '../../components/SideBar';
import { ContentContainer, MainContainer, SecondContainer } from './style';
export function Financial() {
  return (
    <MainContainer>
      <SecondContainer>
        <SideBar page='financeiro' />
        <ContentContainer>
          <div>Em Breve</div>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
