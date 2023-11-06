import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProductRes } from '../../pages';
import {
  ContainerInfo,
  ContainerBottom,
  ContainerName,
  ContainerPrice,
  ContainerTop,
  DescProduct,
  ImgProduct,
  MainContainer,
  NameProduct,
  ValueProduct,
  TitleInfoBottom,
  ContainerItems,
  Item,
  Button,
  ContainerButtons,
} from './style';
import LOGORESTAURANTE from '../../assets/img/logoHamburger.png';
import { currencyValue } from '../../functions/masks';


interface Additional {
  id: number,
  name: string,
  price: number
}

interface PropsProductCreateOrder {
  item: ProductRes;
  index: number;
  allProducts: ProductRes[];
  setAllProducts: Dispatch<SetStateAction<ProductRes[]>>;
  selectProduct: ProductRes[];
  setSelectProduct: Dispatch<SetStateAction<ProductRes[]>>;
  totalValue: number;
  setTotalValue: Dispatch<SetStateAction<number>>;
}



export function ProductCreateOrder({
  item,
  index,
  selectProduct,
  setSelectProduct,
  totalValue,
  setTotalValue
}: PropsProductCreateOrder) {
  const [openInfo, setOpenInfo] = useState<boolean>(true);

  const [meatPoint, setMeatPoint] = useState<string>('');
  const [totalAdditional, setTotalAdditional] = useState<number>(0);

  const typeMeatPoint = ['Mal Passada', 'Ao Ponto', 'Bem Passado'];
  const price = currencyValue(String(item.price));


  function selectAdditional(additional: Additional) {
    const findProductByIndex = selectProduct[index];

    // Cria uma cópia da lista de adicionais selecionados
    const selectedAdditionals = findProductByIndex.AdditionalsSelected
      ? [...findProductByIndex.AdditionalsSelected]
      : [];


    if (selectedAdditionals.includes(additional)) {
      // Remove o adicional da lista de selecionados
      const updatedAdditionals = selectedAdditionals.filter((selected) => selected !== additional);
      setTotalAdditional(totalAdditional - additional.price);
      setTotalValue(totalValue - additional.price);

      // Atualiza o estado selectProduct com a lista atualizada de selecionados
      setSelectProduct((prevState) => {
        return prevState.map((product, i) => (i === index ? { ...product, AdditionalsSelected: updatedAdditionals } : product));
      });
    } else {
      // Adiciona o adicional à lista de selecionados
      const updatedAdditionals = [...selectedAdditionals, additional];
      setTotalAdditional(totalAdditional + additional.price);
      setTotalValue(totalValue + additional.price);

      // Atualiza o estado selectProduct com a lista atualizada de selecionados
      setSelectProduct((prevState) => {
        return prevState.map((product, i) => (i === index ? { ...product, AdditionalsSelected: updatedAdditionals } : product));
      });
    }
  }



  function selectMeatPoint(name: string) {
    setMeatPoint(name);
  }

  function cancelInsertProduct() {

    /* eslint-disable-next-line */
    const newArr = selectProduct.filter((_product, i) => i !== index);
    setSelectProduct(newArr);
    const totalItemPlusAdditional = +item.price + totalAdditional;
    const total = totalValue - totalItemPlusAdditional;
    setTotalValue(total);
  }

  return (
    <MainContainer>
      <ContainerTop open={openInfo} onClick={() => setOpenInfo(!openInfo)}>
        <ImgProduct src={!item.photoProduct ? LOGORESTAURANTE : item.photoProduct} />
        <ContainerInfo>
          <ContainerName>
            <NameProduct>{item.name}</NameProduct>
            <DescProduct>{item.description}</DescProduct>
          </ContainerName>
          <ContainerPrice>
            <ValueProduct>R$: {price}</ValueProduct>
          </ContainerPrice>
        </ContainerInfo>
      </ContainerTop>

      {openInfo && (
        <>
          <ContainerBottom>
            {item.hasMeatPoint && (
              <>
                <TitleInfoBottom>Ponto da Carne:</TitleInfoBottom>
                <ContainerItems>
                  {typeMeatPoint.map((item, i) => (
                    <Item
                      key={i}
                      selected={meatPoint === item}
                      onClick={() => selectMeatPoint(item)}
                    >
                      {item}
                    </Item>
                  ))}
                </ContainerItems>
              </>
            )}
            {item.ProductAdditional && (
              <>
                <TitleInfoBottom>Adicionais:</TitleInfoBottom>
                <ContainerItems>
                  {item.ProductAdditional.map((additional) =>
                    <Item
                      key={additional.id}
                      selected={item.AdditionalsSelected?.includes(additional)}
                      onClick={() => selectAdditional(additional)}>
                      {additional.name}
                    </Item>
                  )}
                </ContainerItems>
              </>
            )}
          </ContainerBottom>
          <ContainerButtons>
            <Button onClick={cancelInsertProduct}>Excluir</Button>
          </ContainerButtons>
        </>
      )}
    </MainContainer>
  );
}
