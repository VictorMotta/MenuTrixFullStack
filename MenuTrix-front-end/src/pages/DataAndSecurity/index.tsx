import { useContext, useEffect, useState } from 'react';
import EveryInfo from '../../components/EveryInfo';
import SideBar from '../../components/SideBar';
import {
  ContainerInfos,
  ContentContainer,
  MainContainer,
  SecondContainer,
  TitlePage,
} from './style';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { User, getUser } from '../../services/userApi';
import { MenuContext } from '../../contexts/menuContext';
import BottomBarMobile from '../../components/BottomBarMobile';
import SideBarConfig from '../../components/SideBarConfig';

export function DataAndSecurity() {
  const token = useToken();
  const [userData, setUserData] = useState<undefined | User>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { resetDados } = useContext(MenuContext);



  useEffect(() => {
    getUserData();
    resetDados();
  }, [loading]);



  async function getUserData(): Promise<void> {
    try {
      const response = await getUser(token);
      setUserData(response);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar carregar as informações! Atualize a página!');
    }
  }

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='dataAndSecurity' />
          <ContentContainer>
            <TitlePage>Dados e Segurança</TitlePage>
            <ContainerInfos>
              {userData && (
                <>
                  <EveryInfo
                    title={'name'}
                    info={userData?.name}
                    userData={userData}
                    setUserData={setUserData}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <EveryInfo
                    title={'email'}
                    info={userData?.email}
                    userData={userData}
                    setUserData={setUserData}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <EveryInfo
                    title={'cpf'}
                    info={userData?.cpf}
                    userData={userData}
                    setUserData={setUserData}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <EveryInfo
                    title={'password'}
                    info={userData?.password}
                    userData={userData}
                    setUserData={setUserData}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </>
              )}
            </ContainerInfos>
          </ContentContainer>
        </SecondContainer>
      </MainContainer>
      <BottomBarMobile />
      <SideBarConfig />
    </>
  );
}
