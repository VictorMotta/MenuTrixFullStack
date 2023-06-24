import { styled } from 'styled-components';

interface PropsMainContainer {
  heightAlter: boolean;
}

export const MainContainer = styled.div<PropsMainContainer>`
  width: 45%;
  padding: 8px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const NameInfo = styled.h1`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

export const ContainerInfoTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerInfoClient = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #d9e0e7;
  justify-content: space-between;
  padding: 20px;
`;

export const InfoClient = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 5px;
`;
