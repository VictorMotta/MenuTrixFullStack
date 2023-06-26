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
  ContainerItem,
  ContainerSuspended,
  ContainerValueTotal,
  ContentColumn,
  ContentContainer,
  FormContainer,
  Input,
  InputCheckBox,
  InputContainer,
  InputSearchProducts,
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

interface Option {
  value: string;
  label: string;
}

export interface OrderBody {
  deliveryOption: string;
  clientEmail: string;
  price: string | number;
  status: string;
  OrderProduct: {
    productId: string | number;
    meatPoint?: string;
    OrderProductAdditional: number[];
  }[];
}

type OrderState = Omit<OrderBody, 'OrderProduct'>;

export type OrderProductState = Pick<OrderBody, 'OrderProduct'>;

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
  const [selectProduct, setSelectProduct] = useState<ProductRes[]>([] as ProductRes[]);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [orderProduct, setOrderProduct] = useState<OrderBody['OrderProduct']>(
    [] as OrderBody['OrderProduct']
  );
  const [newOrder, setNewOrder] = useState<OrderState>({
    clientEmail: '',
    deliveryOption: '',
    price: '',
    status: '',
  });
  const [totalValue, setTotalValue] = useState<string | undefined>(undefined);

  const [search, setSearch] = useState<SearchType>({ search: '' } as SearchType);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const editNewOrder = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setNewOrder({ ...newOrder, [name]: value });
    },
    [newOrder]
  );

  useEffect(() => {
    if (selectProduct[0]) {
      const arrayValue = selectProduct.map((product) => product.price);
      const total = arrayValue.reduce(
        (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
        0
      );
      const totalConvert = currencyValue(String(total));
      setTotalValue(totalConvert);
    }
  }, [selectProduct]);

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
                    allProducts.map((item) => (
                      <SelectProductOrder
                        key={item.id}
                        item={item}
                        selectProduct={selectProduct}
                        setSelectProduct={setSelectProduct}
                        allProducts={allProducts}
                        setAllProducts={setAllProducts}
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
                  orderProduct={orderProduct}
                  setOrderProduct={setOrderProduct}
                  selectProduct={selectProduct}
                  setSelectProduct={setSelectProduct}
                />
              ))}
            <ContainerValueTotal>
              {totalValue && <ValueTotal>Total: {totalValue}</ValueTotal>}
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
