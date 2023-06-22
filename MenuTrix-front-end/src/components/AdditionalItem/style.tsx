import { styled } from 'styled-components';

export const MainContainer = styled.div`
  width: 45%;
  padding: 8px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 30px;
`;

export const TitleAdditional = styled.h1`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #000000;
  text-transform: capitalize;
`;

export const InfoAvailability = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-right: 15px;
  margin-top: 3px;
`;
