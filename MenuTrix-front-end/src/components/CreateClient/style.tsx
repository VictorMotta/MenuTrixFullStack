import { styled } from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  border: 6px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const TopContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
  margin-top: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rubik';
  padding: 12px 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #29333a;
`;

export const FormContainer = styled.form`
  width: 100%;
  padding: 24px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  color: #29333a;
`;

export const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #80aac8;
  border-radius: 5px;
  padding: 15px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 18px;
  color: #29333a;
  margin-top: 10px;
`;

export const TitleInputs = styled.h1`
  color: #29333a;
  font-size: 24px;
  font-family: Rubik;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

export const Button = styled.button`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  padding: 5px 21px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #29333a;
  cursor: pointer;
`;

export const ContainerColumn = styled.div`
  width: 50%;
  padding: 0 3%;
`;
