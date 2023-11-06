import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  ButtonsContainer,
  CheckBoxContainer,
  CheckboxLabel,
  CheckmarkContainer,
  CheckmarkIcon,
  ContainerInputSearch,
  ContainerSuspended,
  ContainerValueTotal,
  ContentColumn,
  ContentContainer,
  FormContainer,
  Input,
  InputCheckBox,
  InputContainer,
  Label,
  MainContainer,
  TitleOptions,
  TopContainer,
  ValueTotal,
} from './style';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { getAllProductsAvailable, getAllProductsAvailableSearch } from '../../services/productApi';
import { ProductRes } from '../../pages';
import { ProductCreateOrder } from '../ProductCreateOrder';
import { SelectProductOrder } from '../SelectProductOrder';
import { currencyValue } from '../../functions/masks';

export interface OrderBody {
  deliveryOption: string;
  clientEmail: string;
  priceTotal: string | number;
  status: string;
  OrderProduct: {
    productId: string | number;
    meatPoint?: string;
    ProductAdditional: {
      id: number;
      name: string;
      price: number;
    }[];
  }[]
}


export type OrderProductState = {
  productId: string | number;
  meatPoint?: string;
  ProductAdditional: {
    id: number;
    name: string;
    price: number;
  }[];
};

interface PartialOrder {
  clientEmail: string;
  deliveryOption: string,
  status: string,
}

interface PropsCreateOrder {
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  setLoadingPage: Dispatch<SetStateAction<boolean>>;
  loadingPage: boolean;
}
interface SearchType {
  search: string;
}

export function CreateOrder({ setOpenCreate, setLoadingPage, loadingPage }: PropsCreateOrder) {
  const token = useToken();

  const [allProducts, setAllProducts] = useState<ProductRes[]>([] as ProductRes[]);

  const [selectProduct, setSelectProduct] = useState<ProductRes[]>([]);

  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const [totalValue, setTotalValue] = useState<number>(0);

  const [newOrder, setNewOrder] = useState<PartialOrder>({
    clientEmail: '',
    deliveryOption: '',
    status: 'PENDING',
  });


  const [search, setSearch] = useState<SearchType>({ search: '' } as SearchType);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const editNewOrder = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setNewOrder({ ...newOrder, [name]: value });
    },
    [newOrder]
  );


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      toast.success('Adicional criado!');
      setLoadingPage(!loadingPage);
    } catch (error) {
      toast.error('Erro ao tentar criar um novo adicional!');
    }
  }

  function handleChecked(e: FormEvent<HTMLInputElement>) {
    setNewOrder({ ...newOrder, deliveryOption: e.currentTarget.value });
  }

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    setSearch({ ...search, [e.currentTarget.name]: e.currentTarget.value });
    typingTimer.current = setTimeout(startFunction, 700);
  };

  async function startFunction() {
    if (search.search === '') {
      return setLoadingPage(!loadingPage);
    }
    try {
      const response = await getAllProductsAvailableSearch(token, search.search);

      setAllProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchOpen() {
    setOpenSearch(true);
    try {
      const response = await getAllProductsAvailable(token);
      setAllProducts(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainContainer>
      <TopContainer>Criar Produto</TopContainer>
      <FormContainer onSubmit={handleSubmit}>
        <ContentContainer>
          <ContentColumn>
            <InputContainer>
              <Label htmlFor='clientEmail'>E-mail do cliente</Label>
              <Input
                name='clientEmail'
                id='clientEmail'
                value={newOrder.clientEmail}
                onChange={editNewOrder}
                required
              />
            </InputContainer>
            <TitleOptions>Opções de entrega</TitleOptions>
            <CheckBoxContainer>
              <CheckmarkContainer>
                <InputCheckBox
                  id='delivery'
                  name='deliveryOption'
                  value='delivery'
                  onChange={handleChecked}
                />
                <CheckmarkIcon className='checkmark' />
              </CheckmarkContainer>
              <CheckboxLabel htmlFor='delivery'>Delivery</CheckboxLabel>
              <CheckmarkContainer>
                <InputCheckBox
                  id='withdrawal'
                  name='deliveryOption'
                  value='withdrawal'
                  onChange={handleChecked}
                />
                <CheckmarkIcon className='checkmark' />
              </CheckmarkContainer>
              <CheckboxLabel htmlFor='withdrawal'>Retirada</CheckboxLabel>
              <CheckmarkContainer>
                <InputCheckBox
                  id='local'
                  name='deliveryOption'
                  value='local'
                  onChange={handleChecked}
                />
                <CheckmarkIcon className='checkmark' />
              </CheckmarkContainer>
              <CheckboxLabel htmlFor='local'>No local</CheckboxLabel>
            </CheckBoxContainer>
            <ContainerInputSearch onClick={searchOpen}>
              <Label htmlFor='products'>Adicionar Produtos:</Label>
              <Input
                placeholder='Selecione o Produto'
                name='search'
                type='text'
                onChange={handleSearchChange}
                autoComplete='off'
                value={search.search}
              />
              {openSearch && (
                <ContainerSuspended onMouseLeave={() => setOpenSearch(false)}>
                  {allProducts[0] ? (
                    allProducts.map((item, _i) => (
                      <SelectProductOrder
                        key={item.id}
                        item={item}
                        selectProduct={selectProduct}
                        setSelectProduct={setSelectProduct}
                        totalValue={totalValue}
                        setTotalValue={setTotalValue}
                      />
                    ))
                  ) : (
                    <>Loading</>
                  )}
                </ContainerSuspended>
              )}
            </ContainerInputSearch>
          </ContentColumn>
          <ContentColumn>
            {selectProduct[0] &&
              selectProduct.map((item, i) => (
                <ProductCreateOrder
                  key={i}
                  item={item}
                  index={i}
                  allProducts={allProducts}
                  setAllProducts={setAllProducts}
                  selectProduct={selectProduct}
                  setSelectProduct={setSelectProduct}
                  totalValue={totalValue}
                  setTotalValue={setTotalValue}
                />
              ))}
            <ContainerValueTotal>
              {selectProduct[0] && <ValueTotal>Total: {currencyValue(String(totalValue))}</ValueTotal>}
            </ContainerValueTotal>
          </ContentColumn>
        </ContentContainer>
        <ButtonsContainer>
          <Button type='submit'>Criar</Button>
          <Button onClick={() => setOpenCreate(false)}>Cancelar</Button>
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
}
