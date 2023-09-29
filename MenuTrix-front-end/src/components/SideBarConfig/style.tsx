import styled, { css, keyframes } from 'styled-components';

interface MainContainerProps {
  activateMenu: boolean;
}

const moveRightAnimation = keyframes`
  0% {
    right: -79%;
  }
  100% {
    right: calc(-79% + 79%);
  }
`;

export const MainContainer = styled.div<MainContainerProps>`
  display: none;
  @media (max-width: 600px) {
    display: ${(props) => (props.activateMenu ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    width: 55%;
    min-height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    background-color: #29333a;
    position:fixed;
    right: 0;
    top: 0;
    z-index: 9;
    animation: ${(props) =>
    props.activateMenu
      ? css`
            ${moveRightAnimation} .1s linear forwards
          `
      : 'none'};
  }
`;

export const ButtonsSideBarConfig = styled.h1`
  font-family: 'Rubik';
  font-weight: 300;
  color: #fff;
  font-size: 16px;
  margin-top: 15px;
  &:hover {
    color: #f7f7f7;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  border-bottom: 0.5px solid #00ACAC;
`;
