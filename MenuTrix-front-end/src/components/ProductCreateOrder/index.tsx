import { Dispatch, SetStateAction, useState } from 'react';
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
import { OrderBody } from '../CreateOrder';

interface PropsProductCreateOrder {
  item: ProductRes;
  index: number;
  allProducts: ProductRes[];
  setAllProducts: Dispatch<SetStateAction<ProductRes[]>>;
  orderProduct: OrderBody['OrderProduct'];
  setOrderProduct: Dispatch<SetStateAction<OrderBody['OrderProduct']>>;
  selectProduct: ProductRes[];
  setSelectProduct: Dispatch<SetStateAction<ProductRes[]>>;
}

export function ProductCreateOrder({
  item,
  index,
  orderProduct,
  setOrderProduct,
  selectProduct,
  setSelectProduct,
}: PropsProductCreateOrder) {
  const [openInfo, setOpenInfo] = useState<boolean>(true);
  const [additionalsSelected, setAdditionalsSelected] = useState<number[]>([]);
  const [meatPoint, setMeatPoint] = useState<string>('');

  const typeMeatPoint = ['Mal Passada', 'Ao Ponto', 'Bem Passado'];
  const price = currencyValue(String(item.price));

  console.log(orderProduct);

  function selectAdditional(id: number) {
    if (!additionalsSelected[0]) {
      return setAdditionalsSelected([id]);
    }
    for (let i = 0; i < additionalsSelected.length; i++) {
      console.log('entrou!');
      if (additionalsSelected[i] === id) {
        const newArr = additionalsSelected.filter((item) => item !== id);
        setAdditionalsSelected(newArr);
      } else {
        setAdditionalsSelected([...additionalsSelected, id]);
      }
    }

    setOrderProduct([...orderProduct]);
  }

  function selectMeatPoint(name: string) {
    setMeatPoint(name);
  }

  function cancelInsertProduct() {
    /* eslint-disable-next-line */
    const newArr = selectProduct.filter((_product, i) => i !== index);
    setSelectProduct(newArr);
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
                  {item.ProductAdditional.map((item) => (
                    <Item
                      key={item.Additional.id}
                      selected={additionalsSelected.includes(item.Additional.id)}
                      onClick={() => selectAdditional(item.Additional.id)}
                    >
                      {item.Additional.name}
                    </Item>
                  ))}
                </ContainerItems>
              </>
            )}
          </ContainerBottom>
          <ContainerButtons>
            <Button>Adicionar</Button>
            <Button onClick={cancelInsertProduct}>Cancelar</Button>
          </ContainerButtons>
        </>
      )}
    </MainContainer>
  );
}
