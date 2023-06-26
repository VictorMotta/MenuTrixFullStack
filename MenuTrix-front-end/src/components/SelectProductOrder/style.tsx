import { styled } from 'styled-components';

export const MainContainer = styled.div`
  width: 90%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 30;
  padding: 5px;
  margin: 5px;
`;

export const ImgProduct = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 5px;
`;

export const ContainerInfo = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NameProduct = styled.h1`
  color: #000;
  font-size: 13px;
  font-family: Rubik;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

export const DescProduct = styled.h2`
  width: 100%;
  color: #000;
  font-size: 10px;
  font-family: Rubik;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContainerName = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ContainerPrice = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-item: center;
`;
