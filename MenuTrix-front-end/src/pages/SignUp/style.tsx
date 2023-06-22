import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #d9e0e7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export const SecondContainer = styled.div`
  width: 70%;
  background-color: white;
  border: 2px solid #29333a;
  margin-bottom: 50px;
  border-radius: 10px;
`;

export const TitleFormContainer = styled.div`
  width: 100%;
  background-color: #29333a;
  padding: 20px 0 20px 0;
  border-radius: 5px 5px 0 0;
`;

export const TitleForm = styled.h1`
  color: #fff;
  font-family: 'Rubik', 'sans-serif';
  font-weight: 700;
  font-size: 32px;
  margin-left: 20px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonGoogle = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
  padding: 10px 30px 10px 30px;
  margin-top: 5%;
  cursor: pointer;
`;

export const IconGoogle = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  margin-right: 14px;
`;

export const ContainerOr = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5% 0 5% 0;
`;

export const Line = styled.div<LinePropType>`
  width: 40%;
  border: 1px solid #707070;
  margin-top: 3px;
  margin: ${(props) => (props.lineDirection === 'left' ? '0 12px 0 0' : '0 0 0 12px')};
`;

type LinePropType = React.ComponentProps<'div'> & {
  lineDirection?: string;
};

export const OrText = styled.h1`
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
  color: #707070;
`;

export const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
`;

export const Input = styled.input`
  font-family: 'Rubik', 'sans-serif';
  font-weight: 400;
  font-size: 20px;
  width: 80%;
  border: 1px solid #80aac8;
  border-radius: 5px;
  padding: 8px 20px 8px 20px;
  margin-bottom: 20px;
`;

export const ButtonForm = styled.button`
  width: 80%;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  border: none;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  font-family: 'Rubik', 'sans-serif';
  font-weight: 600;
  font-size: 20px;
  padding: 8px 30px 8px 30px;
  margin-top: 3%;
  cursor: pointer;
`;

export const ContainerLinkGoBack = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 30px;
`;

export const InfoGoBack = styled.h1`
  font-family: 'Rubik', 'sans-serif';
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`;

export const LinkGoBack = styled(Link)`
  font-family: 'Rubik', 'sans-serif';
  font-weight: 600;
  font-size: 20px;
  color: #00acac;
  margin-left: 8px;
`;
