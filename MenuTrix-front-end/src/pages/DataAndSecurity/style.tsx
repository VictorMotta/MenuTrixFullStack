import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  padding-top: 4.7%;
  background-color: #d9e0e7;
  overflow: hidden;
`;

export const SecondContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 92.5vh;
  display: flex;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  width: 75%;
  height: 100%;
  min-height: 85vh;
  max-height: 85vh;
  background: #ffffff;
  border-radius: 10px;
  margin-right: 2.3%;
  margin-top: 1.5%;
  overflow: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
`;

export const TitlePage = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 32px;
  color: #29333a;
  margin: 44px 0 49px 42px;
`;

export const ContainerInfos = styled.div`
  width: 100%;
  padding-left: 42px;
`;
