import { styled } from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 6px solid #ffffff;
  margin-bottom: 20px;
  z-index: 30;
  padding: 5px;
`;

interface PropsContainerTop {
  open: boolean;
}

export const ContainerTop = styled.div<PropsContainerTop>`
  width: 100%;
  background: #ffffff;
  border-radius: ${(props) => (props.open === true ? '10px 10px 0px 0px' : '20px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ImgProduct = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 5px;
`;

export const ContainerInfo = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const NameProduct = styled.h1`
  color: #000;
  font-size: 18px;
  font-family: Rubik;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

export const DescProduct = styled.h2`
  width: 100%;
  color: #000;
  font-size: 15px;
  font-family: Rubik;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContainerName = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ContainerPrice = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-item: center;
`;

export const ValueProduct = styled.h1`
  color: #000;
  font-size: 10px;
  font-family: Rubik;
  font-weight: 700;
  margin-right: 20px;
`;

export const ContainerBottom = styled.div`
  width: 100%;
  display: flex;
  background: #d9e0e7;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
`;

export const TitleInfoBottom = styled.h1`
  color: #000;
  font-size: 12px;
  font-family: Rubik;
  font-weight: 700;
`;

export const ContainerItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

interface PropsItem {
  selected?: boolean;
}

export const Item = styled.div<PropsItem>`
  border-radius: 20px;
  box-sizing: border-box;
  border: ${(props) => props.selected === true && '2px solid #00acac'};
  background: #fff;
  padding: 5px 10px;
  color: #000;
  font-size: 10px;
  font-family: Rubik;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 0.5px solid #000;
  padding: 3px 8px;
  color: #000;
  font-size: 10px;
  font-family: Rubik;
  font-weight: 600;
  cursor: pointer;
  background: #fff;
`;
