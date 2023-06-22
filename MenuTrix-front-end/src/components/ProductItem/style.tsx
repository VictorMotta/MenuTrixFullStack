import { styled } from 'styled-components';
import Select from 'react-select';

export const MainContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 6px solid #ffffff;
  margin-bottom: 20px;
  z-index: 30;
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
`;

interface PropsContainerColumn {
  justify?: string;
  pointer?: string;
}

export const ContainerColumnTop = styled.div<PropsContainerColumn>`
  width: 60%;
  display: flex;
  padding: 20px;
  align-items: center;
  cursor: ${(props) => props.pointer};
  justify-content: ${(props) => props.justify};
`;

export const ImgProduct = styled.img`
  width: 80px;
  min-width: 80px;
  height: 80px;
  min-height: 80px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ContainerInfo = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

export const NameProduct = styled.h1`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

export const DescProduct = styled.h2`
  width: 100%;
  font-family: 'Rubik';
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContainerAvailable = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const AvailabilityInfo = styled.h3`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
  margin-top: 5px;
`;

export const ContainerInfoProduct = styled.div`
  width: 100%;
  display: flex;
  background: #d9e0e7;
  justify-content: space-between;
`;

interface ContainerColumnInfoProduct {
  right_border?: string;
  left_border?: string;
}
export const ContainerColumnInfoProduct = styled.div<ContainerColumnInfoProduct>`
  width: 49.99%;
  border-right: ${(props) => props.right_border};
  border-left: ${(props) => props.left_border};
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 0 20px;
`;

export const TitleDescription = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

export const DescriptionProduct = styled.h1`
  font-family: 'Rubik';
  font-weight: 300;
  font-size: 14px;
  color: #000000;
  margin-top: 10px;
`;

export const ContainerPriceProduct = styled.div`
  width: 100%;
  max-height: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;

export const PriceProduct = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 14px;
  color: #000000;
`;

export const TitleAdditionalAvailable = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
`;

export const ContainerAdditionalAvailable = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const AdditionalAvailable = styled.span`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 13px;
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  padding: 3px 10px;
  margin-right: 10px;
  margin-bottom: 15px;
  background: #ffffff;
  border-radius: 20px;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0px 0px 10px 10px;
  justify-content: center;
  background: #ffffff;
`;

interface PropsContainerColumnButtons {
  alignContentFlex: string;
}

export const ContainerColumnButtons = styled.div<PropsContainerColumnButtons>`
  width: 50%;
  padding: 10px;
  display: flex;
  justify-content: ${(props) => props.alignContentFlex};
`;

export const Button = styled.button`
  background: #fff;
  border: 1px solid #29333a;
  border-radius: 10px;
  padding: 10px 22px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #29333a;
  cursor: pointer;
`;

export const ContainerNotHasAdditional = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleNotHasAdditional = styled.h1`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
`;

export const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #80aac8;
  border-radius: 5px;
  padding: 15px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 18px;
  color: #29333a;
  margin-top: 10px;
  &::placeholder {
    font-size: 13px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: #ffffff;
  border: 1px solid #80aac8;
  border-radius: 5px;
  padding: 15px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 13px;
  color: #29333a;
  resize: none;
  margin-top: 10px;
  &::placeholder {
    font-size: 15px;
  }
`;

export const ContainerPriceInput = styled.div`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 14px;
  display: flex;
  color: #000000;
  width: 25%;
  align-items: center;
`;

export const PriceInput = styled.input`
  width: 100%;
  height: 25px;
  background: #ffffff;
  border: 1px solid #90b5cf;
  border-radius: 5px;
  margin-left: 5px;
  padding: 10px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 15px;
  color: #29333a;
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  color: #29333a;
`;

export const InputSearchAdditionals = styled(Select)`
  width: 100%;
  background: #ffffff;
  border: 1px solid #80aac8;
  border-radius: 5px;
  padding: 15px;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 18px;
  color: #29333a;
  margin-top: 10px;
  font-size: 15px;
  z-index: 30;
`;
