import styled from 'styled-components';
import { MdMenu, MdFilterAlt, MdClose } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';

export const MainContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #29333a;
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
`;

export const FirstContainerButtons = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    width: 33.33%;
    padding-left: 5%;
    height: 100%;
  }
`;

export const IconMenu = styled(MdMenu)`
  font-size: 32px;
  color: #9ab3b3;
  cursor: pointer;
`;

export const SecondContainerButtons = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33%;
    height: 100%;
    position: relative;
  }
`;

interface PropsButtonSquareCreate {
  hidden?: boolean;
}

export const ButtonSquareCreate = styled.div<PropsButtonSquareCreate>`
  width: 66px;
  height: 66px;
  background-color: #fff;
  filter: drop-shadow(3px 4px 10px rgba(0, 0, 0, 0.25));
  border-radius: 50%;
  position: absolute;
  top: -33px;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const IconPlusSquareCreate = styled(AiOutlinePlus)`
  font-size: 32px;
  color: #29333a;
`;

export const ThirdContainerButtons = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 33.33%;
    padding-right: 5%;
    height: 100%;
  }
`;

export const IconConfig = styled(BsThreeDotsVertical)`
  font-size: 28px;
  color: #9ab3b3;
  cursor: pointer;
`;

export const IconFilter = styled(MdFilterAlt)`
  font-size: 32px;
  color: #9ab3b3;
  margin-right: 5%;
  cursor: pointer;
`;

interface PropsIconMagnifyingGlass {
  activateMGlass?: boolean;
}

export const IconMagnifyingGlass = styled(FaSearch)<PropsIconMagnifyingGlass>`
  display: ${(props) => props.activateMGlass ? 'block' : 'none'};
  font-size: 25px;
  color: #9ab3b3;
  margin-right: 5%;
  cursor: pointer;
`;

export const IconClose = styled(MdClose)`
  font-size: 32px;
  color: #9ab3b3;
  cursor: pointer;
`;
