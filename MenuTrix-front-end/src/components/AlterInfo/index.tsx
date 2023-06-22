import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  ContainerButton,
  ContainerNew,
  FirstInput,
  Input,
  InputContainer,
  Label,
  MainContainer,
} from './style';
import { User, alterUser } from '../../services/userApi';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';

interface StateInfo {
  upperCase: string;
  lowerCase: string;
  firstLetterUpper: string;
}

type StateBodyInfo = {
  newName?: string;
  mainEmail?: string;
  newEmail?: string;
  repeatEmail?: string;
  mainCpf?: string;
  newCpf?: string;
  repeatCpf?: string;
  mainPassword?: string;
  newPassword?: string;
  repeatPassword?: string;
  new?: string;
  [key: string]: string | undefined;
};

export default function AlterInfo({
  title,
  setSelected,
  userData,
  setUserData,
  loading,
  setLoading,
}: MyProps) {
  const token = useToken();
  const [infos, setInfos] = useState<StateInfo>({
    upperCase: '',
    lowerCase: '',
    firstLetterUpper: '',
  });
  const [bodyInfo, setBodyInfo] = useState<StateBodyInfo>({
    newName: '',
    mainEmail: '',
    newEmail: '',
    repeatEmail: '',
    mainCpf: '',
    newCpf: '',
    repeatCpf: '',
    mainPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  useEffect(() => {
    if (title === 'email')
      return setInfos({ upperCase: 'E-MAIL', lowerCase: 'email', firstLetterUpper: 'Email' });
    if (title === 'cpf')
      return setInfos({ upperCase: 'CPF', lowerCase: 'cpf', firstLetterUpper: 'Cpf' });
    if (title === 'password')
      return setInfos({ upperCase: 'SENHA', lowerCase: 'password', firstLetterUpper: 'Password' });
  }, [title]);

  async function editBodyInfo(e: ChangeEvent<HTMLInputElement>) {
    setBodyInfo({ ...bodyInfo, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title === 'name') {
      try {
        const body = {
          newName: bodyInfo.newName,
        };
        const response = await alterUser(token, 'name', body);
        setUserData({ ...userData, name: response.name });
        setLoading(!loading);
        toast.success('Nome Alterado com sucesso!');
        setSelected(false);
      } catch (error) {
        toast.error('Erro ao tentar alterar o nome!');
      }
    }
    if (title === 'email') {
      try {
        const body = {
          mainEmail: bodyInfo.mainEmail,
          newEmail: bodyInfo.newEmail,
          repeatEmail: bodyInfo.repeatEmail,
        };
        const response = await alterUser(token, 'email', body);
        setUserData({ ...userData, email: response.email });
        setLoading(!loading);
        toast.success('E-mail Alterado com sucesso!');
        setSelected(false);
      } catch (error) {
        toast.error('Erro ao tentar alterar o e-mail!');
      }
    }

    if (title === 'cpf') {
      try {
        const body = {
          mainCpf: bodyInfo.mainCpf,
          newCpf: bodyInfo.newCpf,
          repeatCpf: bodyInfo.repeatCpf,
        };
        const response = await alterUser(token, 'cpf', body);
        setUserData({ ...userData, cpf: response.cpf });
        setLoading(!loading);
        toast.success('Cpf Alterado com sucesso!');
        setSelected(false);
      } catch (error) {
        toast.error('Erro ao tentar alterar o cpf!');
      }
    }
    if (title === 'password') {
      try {
        const body = {
          mainPassword: bodyInfo.mainPassword,
          newPassword: bodyInfo.newPassword,
          repeatPassword: bodyInfo.repeatPassword,
        };
        await alterUser(token, 'password', body);
        toast.success('Senha Alterada com sucesso!');
        setSelected(false);
      } catch (error) {
        console.log(error);
        toast.error('Erro ao tentar alterar a senha!');
      }
    }
  }

  if (title === 'name') {
    return (
      <MainContainer onSubmit={(e) => handleSubmit(e)}>
        <InputContainer>
          <Label htmlFor='name'>DIGITE O NOVO NOME:</Label>
          <Input type='text' name='newName' onChange={editBodyInfo} value={bodyInfo.newName} />
        </InputContainer>
        <ContainerButton>
          <Button>Atualizar</Button>
          <Button onClick={() => setSelected(false)}>Cancelar</Button>
        </ContainerButton>
      </MainContainer>
    );
  }

  return (
    <MainContainer onSubmit={(e) => handleSubmit(e)}>
      <InputContainer>
        <Label htmlFor={'main' + infos.firstLetterUpper}>{infos.upperCase} ATUAL:</Label>
        <FirstInput
          type={infos.lowerCase}
          name={'main' + infos.firstLetterUpper}
          onChange={editBodyInfo}
          value={bodyInfo['main' + infos.firstLetterUpper]}
        />
      </InputContainer>
      <ContainerNew>
        <InputContainer>
          <Label htmlFor={'new' + infos.firstLetterUpper}>NOVO {infos.upperCase}:</Label>
          <Input
            type={infos.lowerCase}
            name={'new' + infos.firstLetterUpper}
            onChange={editBodyInfo}
            value={bodyInfo['new' + infos.firstLetterUpper]}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor={'repeat' + infos.firstLetterUpper}>REPITA {infos.upperCase}:</Label>
          <Input
            type={infos.lowerCase}
            name={'repeat' + infos.firstLetterUpper}
            onChange={editBodyInfo}
            value={bodyInfo['repeat' + infos.firstLetterUpper]}
          />
        </InputContainer>
      </ContainerNew>
      <ContainerButton>
        <Button>Atualizar</Button>
        <Button onClick={() => setSelected(false)}>Cancelar</Button>
      </ContainerButton>
    </MainContainer>
  );
}

interface MyProps {
  title: string;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
