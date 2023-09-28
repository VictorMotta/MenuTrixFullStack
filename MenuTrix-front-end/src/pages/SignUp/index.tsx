import { ChangeEvent, FormEvent, useState } from 'react';
import TopBar from '../../components/TopBar';
import {
  SecondContainer,
  MainContainer,
  TitleForm,
  TitleFormContainer,
  FormContainer,
  ButtonGoogle,
  IconGoogle,
  ContainerOr,
  Line,
  OrText,
  Form,
  Input,
  ButtonForm,
  InfoGoBack,
  LinkGoBack,
  ContainerLinkGoBack,
  ContainerButtonGoogle,
} from './style';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function SignUp() {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signUp(body);
      toast.success('Cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao tentar se cadastrar!');
    }
  }

  async function editBody(e: ChangeEvent<HTMLInputElement>) {
    setBody({ ...body, [e.target.name]: e.target.value });
  }

  return (
    <MainContainer>
      <SecondContainer>
        <TitleFormContainer>
          <TitleForm>Cadastre-se no MenuTrix</TitleForm>
        </TitleFormContainer>
        <FormContainer>
          <ButtonGoogle>
            <ContainerButtonGoogle>
              <IconGoogle>
                <FcGoogle></FcGoogle>
              </IconGoogle>
              Cadastre-se com Google
            </ContainerButtonGoogle>
          </ButtonGoogle>
          <ContainerOr>
            <Line lineDirection='left'></Line>
            <OrText>or</OrText>
            <Line></Line>
          </ContainerOr>
          <Form onSubmit={handleSubmit}>
            <Input placeholder='Nome' name='name' value={body.name} onChange={editBody} />
            <Input placeholder='CPF' name='cpf' value={body.cpf} onChange={editBody} />
            <Input placeholder='E-mail' name='email' value={body.email} onChange={editBody} />
            <Input
              placeholder='Senha'
              type='password'
              name='password'
              value={body.password}
              onChange={editBody}
            />
            <Input
              placeholder='Repetir senha'
              name='repeatPassword'
              type='password'
              value={body.repeatPassword}
              onChange={editBody}
            />
            <ButtonForm>Cadastre-se</ButtonForm>
          </Form>
          <ContainerLinkGoBack>
            <InfoGoBack>Já tem conta?</InfoGoBack>
            <LinkGoBack to={'/'}>Entre!</LinkGoBack>
          </ContainerLinkGoBack>
        </FormContainer>
      </SecondContainer>
    </MainContainer>
  );
}
