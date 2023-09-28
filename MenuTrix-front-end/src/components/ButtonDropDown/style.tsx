import styled from 'styled-components';

export const MainContainerButtonDropDown = styled.div`
  display: flex;
  flex-direction: column;
  width: 7%;
  align-items: center;
  margin-right: 44px;
  background-color: #fff;
  padding: 0;
  position: relative;
  @media (max-width: 600px) {
    display: none;
  }
`;

interface SelectProps {
  select?: boolean;
}

export const ButtonDropDownStyled = styled.button<SelectProps>`
  width: 100%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${(props) => (props.select ? '#F6F6F6' : '#FFFFFF')};
  cursor: pointer;
  border-radius: 10px;
`;

export const ImgLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 100%;
  padding: 5px;
`;

export const IconArrow = styled.div`
  font-size: 35px;
  color: #29333a;
  display: flex;
  align-items: center;
`;

export const ContainerDropDown = styled.div`
  width: 200%;
  position: absolute;
  border-radius: 10px;
  top: 120%;
  box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.2);
  padding: 6px 9px;
  margin-right: 100px;
  background-color: #fff;
  z-index: 11;
`;

export const ButtonConfigs = styled.button`
  width: 100%;
  border-radius: 11px;
  padding: 9px 13px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  text-align: start;
  transition: 0.5s;
  margin-bottom: 3px;
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 17px;
  color: #000000;
  z-index: 12;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 3px;
  border-bottom: 0.5px solid #c5c5c5;
`;
