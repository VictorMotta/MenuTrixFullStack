import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContainerSideBar = styled.div`
  min-width: 20%;
  height: 95vh;
  min-height: 100%;
  background-color: #29333a;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

export const NameButton = styled.div`
  font-family: 'Rubik';
  font-weight: 800;
  font-size: 30px;
  color: #e1ffff;
  margin-left: 12px;
`;

export const ContainerLinkSellInfo = styled.div`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 20px;
  color: #e1ffff;
  margin-bottom: 10%;
  padding: 0 18px;
`;

export const ContainerLinkSell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
`;
