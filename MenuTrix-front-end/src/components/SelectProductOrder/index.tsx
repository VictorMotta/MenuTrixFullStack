import { ProductRes } from '../../pages';
import {
  ContainerInfo,
  ContainerName,
  DescProduct,
  ImgProduct,
  MainContainer,
  NameProduct,
} from './style';
import LOGORESTAURANTE from '../../assets/img/logoHamburger.png';
import { Dispatch, SetStateAction } from 'react';

interface PropsProductCreateOrder {
  item: ProductRes;
  selectProduct: ProductRes[];
  setSelectProduct: Dispatch<SetStateAction<ProductRes[]>>;
  totalValue: number;
  setTotalValue: Dispatch<SetStateAction<number>>;
}

export function SelectProductOrder({
  item,
  selectProduct,
  setSelectProduct,
  totalValue,
  setTotalValue
}: PropsProductCreateOrder) {

  function select() {
    setSelectProduct([...selectProduct, item]);
    setTotalValue(() => totalValue + Number(item.price));
  }

  return (
    <MainContainer onClick={select}>
      <ImgProduct src={!item.photoProduct ? LOGORESTAURANTE : item.photoProduct} />
      <ContainerInfo>
        <ContainerName>
          <NameProduct>{item.name}</NameProduct>
          <DescProduct>{item.description}</DescProduct>
        </ContainerName>
      </ContainerInfo>
    </MainContainer>
  );
}
