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
  allProducts: ProductRes[];
  setAllProducts: Dispatch<SetStateAction<ProductRes[]>>;
}

export function SelectProductOrder({
  item,
  selectProduct,
  setSelectProduct,
  allProducts,
  setAllProducts,
}: PropsProductCreateOrder) {
  function select() {
    setSelectProduct([...selectProduct, item]);
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
