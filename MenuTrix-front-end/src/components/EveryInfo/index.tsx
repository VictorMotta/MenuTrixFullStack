import { MdEditSquare } from 'react-icons/md';
import { ContainerEveryInfo, IconEdit, Info, TitleInfo } from './style';
import { useEffect, useState } from 'react';
import AlterInfo from '../AlterInfo';
import { User } from '../../services/userApi';

export default function EveryInfo({
  title,
  info,
  userData,
  setUserData,
  loading,
  setLoading,
}: PropsEveryInfo) {
  const [titleUpdate, setTitleUpdate] = useState<undefined | string>(undefined);
  const [infoUpdate, setInfoUpdate] = useState<undefined | string>(undefined);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    updateInfo();
  }, [loading]);

  function updateInfo() {
    if (title === 'email') {
      setTitleUpdate('E-mail: ');
    } else if (title === 'cpf') {
      setTitleUpdate('CPF: ');
    } else if (title === 'password') {
      setTitleUpdate('Alterar Senha');
    }

    let infoTemp: undefined | string = undefined;

    if (title === 'email') {
      if (info !== undefined) {
        const arrInfo = info.split('');
        const atIndex = info.indexOf('@');
        if (infoTemp === undefined) infoTemp = '';
        for (let i = 0; i < arrInfo.length; i++) {
          const letter = String(arrInfo[i]);
          if (i === 0) {
            infoTemp += letter;
          } else if (i < atIndex) {
            infoTemp += '*';
          } else {
            infoTemp += letter;
          }
        }
      }
    }

    if (title === 'cpf') {
      if (info !== undefined) {
        const cpf = formatCPF(info);
        const arrCpf = cpf.split('');
        if (infoTemp === undefined) infoTemp = '';
        for (let i = 0; i < arrCpf.length; i++) {
          const letter = String(arrCpf[i]);
          if (i === arrCpf.length - 1) {
            infoTemp += letter;
          } else if (i === arrCpf.length - 2) {
            infoTemp += letter;
          } else if (i === arrCpf.length - 3) {
            infoTemp += letter;
          } else {
            infoTemp += '*';
          }
        }
      }
    }

    if (title === 'name') {
      setTitleUpdate('Name: ');
      return setInfoUpdate(info);
    }

    setInfoUpdate(infoTemp);
  }

  function formatCPF(cpf: string): string {
    let cpfData: string | string[] = cpf;
    cpfData = cpfData.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpfData = cpfData.slice(0, 11); // Garante que teremos apenas 11 dígitos

    cpfData = cpfData.split('');
    cpfData.splice(3, 0, '.');
    cpfData.splice(7, 0, '.');
    cpfData.splice(11, 0, '-');

    return cpfData.join('');
  }

  if (selected) {
    return (
      <ContainerEveryInfo>
        <AlterInfo
          title={title}
          setSelected={setSelected}
          userData={userData}
          setUserData={setUserData}
          loading={loading}
          setLoading={setLoading}
        />
      </ContainerEveryInfo>
    );
  }

  return (
    <ContainerEveryInfo>
      {title !== 'password' ? (
        <>
          <TitleInfo>{titleUpdate}</TitleInfo>
          <Info>
            <h3>{infoUpdate}</h3>
            <IconEdit>
              <MdEditSquare onClick={() => setSelected(true)} />
            </IconEdit>
          </Info>
        </>
      ) : (
        <>
          <Info>
            <TitleInfo>{titleUpdate}</TitleInfo>
            <IconEdit>
              <MdEditSquare onClick={() => setSelected(true)} />
            </IconEdit>
          </Info>
        </>
      )}
    </ContainerEveryInfo>
  );
}

interface PropsEveryInfo {
  title: string;
  info?: string;
  userData: User;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
}
