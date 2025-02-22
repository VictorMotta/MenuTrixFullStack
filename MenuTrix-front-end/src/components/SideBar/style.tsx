import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

interface MainContainerSideBarProps {
  activate?: boolean;
}

const moveRightAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: calc(-79% + 79%);
  }
`;

const moveLeftAnimation = keyframes`
  100% {
    left: -100%;
  }
  0% {
    left: calc(-79% + 79%);
  }
`;





export const MainContainerSideBar = styled.div<MainContainerSideBarProps>`
  min-width: 20%;
  height: 95vh;
  min-height: 100%;
  background-color: #29333a;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 600px) {
    display: ${(props) => (props.activate ? 'flex' : 'none')};
    width: 100%;
    min-height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    top: 0;
    left: calc(-79% + 79%);
    position: fixed;
    z-index: 9;
    animation: ${(props) =>
    props.activate
      ? css`
            ${moveRightAnimation} .1s linear forwards
          `
      : css`
            ${moveLeftAnimation} .1s linear forwards
          `
  };
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
`;

interface ButtonMenuProps {
  select?: boolean;
}

export const ButtonMenu = styled.button<ButtonMenuProps>`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.select ? '#4F5B69' : '#29333A')};
  cursor: ${(props) => !props.select && 'pointer'};
  border: none;
  border-left: ${(props) => props.select && '3px solid #00ACAC'};
`;

export const IconButton = styled.div`
  font-size: 32px;
  color: #9ab3b3;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const NameButton = styled.div`
  font-family: 'Rubik';
  font-weight: 800;
  font-size: 30px;
  color: #e1ffff;
  margin-left: 12px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ContainerLinkSellInfo = styled.div`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 20px;
  color: #e1ffff;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10%;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ContainerLinkSell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkSell = styled(Link)`
  color: #e1ffff;
`;

export const ButtonCopy = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  font-size: 24px;
  color: #e1ffff;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
