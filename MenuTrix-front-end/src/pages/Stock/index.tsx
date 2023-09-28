import SideBar from '../../components/SideBar';
import { ContentContainer, MainContainer, SecondContainer } from './style';
export function Estoque() {
  return (
    <MainContainer>
      <SecondContainer>
        <SideBar page='estoque' />
        <ContentContainer>
          <div>Em Breve</div>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
