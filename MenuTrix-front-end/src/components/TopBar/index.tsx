import { LogoStyle, MainTopBarStyle } from './style';
import logo from '../../assets/img/logoMenuTrix.png';
import ButtonDropDown from '../ButtonDropDown';

export default function TopBar({ page }: { page?: string }) {
  return (
    <MainTopBarStyle page={page}>
      <LogoStyle src={logo} />
      {page !== 'login' && page !== 'cadastro' ? <ButtonDropDown /> : null}
    </MainTopBarStyle>
  );
}
