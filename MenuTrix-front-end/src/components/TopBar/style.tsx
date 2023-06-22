import styled from 'styled-components';

interface MainTopBarProps {
  page?: string;
}

export const MainTopBarStyle = styled.div<MainTopBarProps>`
  width: 100%;
  max-height: 9%;
  background-color: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 5px 0 5px 0;
  position: fixed;
  display: ${(props) => (props.page !== 'login' && props.page !== 'cadastro' ? 'flex' : null)};
  justify-content: ${(props) =>
    props.page !== 'login' && props.page !== 'cadastro' ? 'space-between' : null};
  top: 0;
  z-index: 2;
`;

export const LogoStyle = styled.img`
  margin-left: 32px;
  width: 179px;
  object-fit: fill;
`;
