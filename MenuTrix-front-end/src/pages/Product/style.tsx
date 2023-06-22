import { styled } from 'styled-components';

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
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 75%;
  height: 100%;
  min-height: 85vh;
  max-height: 85vh;
  margin-right: 1.5%;
  overflow: auto;
  position: relative;
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

export const ContainerCreateSearch = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
`;

export const ButtonCreate = styled.button`
  margin-left: 5px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #29333a;
  padding: 15px 20px;
  border: none;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  h1 {
    margin-left: 10px;
  }
`;

export const ContainerProducts = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const ContainerNotHasProduct = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotHasProduct = styled.h1`
  width: 60%;
  font-family: 'Rubik';
  font-weight: 700;
  text-align: center;
  font-size: 40px;
  color: #29333a;
`;
