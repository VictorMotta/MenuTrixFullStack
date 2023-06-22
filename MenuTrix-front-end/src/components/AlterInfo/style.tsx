import styled from 'styled-components';

export const MainContainer = styled.form`
  width: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  color: #29333a;
`;

export const FirstInput = styled.input`
  width: 45%;
  height: 36px;
  border: 1px solid #969595;
  border-radius: 5px;
  margin-top: 6px;
`;

export const Input = styled.input`
  width: 90%;
  height: 36px;
  border: 1px solid #969595;
  border-radius: 5px;
  margin-top: 6px;
`;

export const ContainerNew = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 48px;
`;

export const Button = styled.button`
  padding: 12px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #29333a;
  cursor: pointer;
`;
