import styled, { css, keyframes } from 'styled-components';

interface MainContainerProps {
  activateMenu: boolean;
}

const moveRightAnimation = keyframes`
  0% {
    right: -55%;
  }
  100% {
    right: 0;
  }
`;

const moveLeftAnimation = keyframes`
  100% {
    right: -55%;
  }
  0% {
    right: 0;
    
  }
`;




export const MainContainer = styled.div<MainContainerProps>`
  display: none;
  @media (max-width: 600px) {
    display: ${(props) => (props.activateMenu ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    background-color: #29333a;
    position:fixed;
    right: -55%;
    top: 0;
    z-index: 9;
    animation: ${(props) =>
    props.activateMenu ?
      css` ${moveRightAnimation} .1s linear forwards` :
      css` ${moveLeftAnimation} .1s linear forwards`
  }
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
