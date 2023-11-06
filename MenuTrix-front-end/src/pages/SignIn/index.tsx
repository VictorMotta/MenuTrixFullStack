import { ChangeEvent, FormEvent, useContext, useState } from 'react';
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
import { toast } from 'react-toastify';
import { signIn } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { RestaurantContext } from '../../contexts/restaurantContext';

export function SignIn() {
  const { getRestaurant } = useContext(RestaurantContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: '',
    password: '',
  });

  async function editBody(e: ChangeEvent<HTMLInputElement>) {
    setBody({ ...body, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await signIn(body);
      getRestaurant(response.token);
      toast.success('Logado com sucesso!');
      login(response);

      navigate('/pedidos');
    } catch (error) {
      toast.error('Erro ao tentar entrar!');
    }
  }

  return (
    <MainContainer>
      <SecondContainer>
        <TitleFormContainer>
          <TitleForm>Logar-se no MenuTrix</TitleForm>
        </TitleFormContainer>
        <FormContainer>
          <ButtonGoogle>
            <ContainerButtonGoogle>
              <IconGoogle>
                <FcGoogle></FcGoogle>
              </IconGoogle>
              Entrar com Google
            </ContainerButtonGoogle>
          </ButtonGoogle>
          <ContainerOr>
            <Line lineDirection='left'></Line>
            <OrText>or</OrText>
            <Line></Line>
          </ContainerOr>
          <Form onSubmit={handleSubmit}>
            <Input placeholder='E-mail' name='email' value={body.email} onChange={editBody} />
            <Input
              placeholder='Senha'
              type='password'
              name='password'
              value={body.password}
              onChange={editBody}
            />
            <ButtonForm>Logar-se</ButtonForm>
          </Form>
          <ContainerLinkGoBack>
            <InfoGoBack>Não tem conta?</InfoGoBack>
            <LinkGoBack to={'/cadastro'}>Cadastrar-se!</LinkGoBack>
          </ContainerLinkGoBack>
        </FormContainer>
      </SecondContainer>
    </MainContainer>
  );
}
