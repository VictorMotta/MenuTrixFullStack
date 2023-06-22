import { styled } from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import Select from 'react-select';

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
  justify-content: space-between;
`;

export const ContentColumn = styled.div`
  width: 45%;
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

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const CheckmarkContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

export const InputCheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  border-radius: 3px;
  margin-right: 8px;
  cursor: pointer;
  z-index: 20;

  &:checked ~ .checkmark {
    display: block;
  }
`;

export const CheckboxLabel = styled.label`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 24px;
  color: #000000;
`;

export const CheckmarkIcon = styled(RiCloseLine)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-61%, -50%);
  color: #000;
  display: none;
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
  &::placeholder {
    font-size: 15px;
  }
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

export const InputSearchAdditionals = styled(Select)`
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
  font-size: 15px;
`;

export const ContainerAdditional = styled.div`
  background: #ffffff;
  border-radius: 20px;
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 13px;
  color: #000000;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const MainContainerAdditional = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
