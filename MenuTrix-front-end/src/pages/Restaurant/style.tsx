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
  width: 100%;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 32px;
  color: #29333a;
  padding: 44px 0 49px 3%;
`;

export const FormInfos = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerInfos = styled.div`
  width: 100%;
  display: flex;
`;

interface ContainerColumnProps {
  border?: boolean;
}

export const ContainerColumn = styled.div<ContainerColumnProps>`
  width: 50%;
  border-right: ${(props) => props.border === true && '1px solid #000000'};
  padding: 0 3%;
`;

export const ContainerInput = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const LabelInputInfo = styled.label`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  color: #29333a;
`;

export const InputInfo = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #80aac8;
  border-radius: 5px;
  margin-top: 8px;
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
  padding: 8px 20px 8px 20px;
`;

export const TitleAddress = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 24px;
  color: #29333a;
`;

export const ContainerCheckBox = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

export const TitleContainer = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  color: #29333a;
`;

export const ContainerAllCheckbox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export const ContainerOption = styled.div`
  margin-right: 10px;
  display: flex;
  margin-bottom: 5px;
`;

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 5px;
`;

export const LabelCheckBox = styled.label`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  color: #29333a;
`;

export const ContainerHorary = styled.div`
  display: flex;
`;

export const SecondContainerHorary = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 30px;
`;

export const TitleHorary = styled.h1`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
`;

export const InputHorary = styled.input`
  width: 25%;
  height: 34px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
`;

export const LabelHorary = styled.label`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  margin: 0 5px;
`;

export const ContainerInputNameSite = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const ButtonUpdate = styled.button`
  background: #ffffff;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  padding: 12px 25px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  color: #29333a;
  margin: 42px 0;
  cursor: pointer;
`;
