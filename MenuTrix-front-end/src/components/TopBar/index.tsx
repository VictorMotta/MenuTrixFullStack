import { LogoStyle, MainTopBarStyle } from './style';
import logo from '../../assets/img/logoMenuTrix.png';
import ButtonDropDown from '../ButtonDropDown';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  const page = location.pathname.replace('/', '');


  return (
    <MainTopBarStyle page={page}>
      <LogoStyle src={logo} />
      {page !== '' && page !== 'cadastro' ? <ButtonDropDown /> : null}
    </MainTopBarStyle>
  );
}
