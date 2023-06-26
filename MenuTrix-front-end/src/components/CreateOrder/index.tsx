import { Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';
import {
  Button,
  ButtonsContainer,
  ContentColumn,
  ContentContainer,
  FormContainer,
  Input,
  InputContainer,
  InputSearchProducts,
  Label,
  MainContainer,
  TopContainer,
} from './style';
import { toast } from 'react-toastify';

interface Option {
  value: string;
  label: string;
}

interface OrderBody {
  deliveryOption: string;
  clientEmail: string;
  clientName: string;
  price: string | number;
  status: string;
  OrderProduct: {
    productId: string | number;
    meatPointId?: string;
    OrderProductAdditional: {
      AdditionalId: string | number;
    }[];
  }[];
}

type OrderState = Omit<OrderBody, 'OrderProduct'>;

type OrderProductState = Pick<OrderBody, 'OrderProduct'>;

interface PropsCreateOrder {
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  setLoadingPage: Dispatch<SetStateAction<boolean>>;
  loadingPage: boolean;
}

export function CreateOrder({ setOpenCreate, setLoadingPage, loadingPage }: PropsCreateOrder) {
  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);
  const [orderProduct, setOrderProduct] = useState<OrderProductState[]>([] as OrderProductState[]);
  const [newOrder, setNewOrder] = useState<OrderState>({
    clientName: '',
    clientEmail: '',
    deliveryOption: '',
    price: '',
    status: '',
  });

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
      setAllOptions([{ value: 'test', label: 'test' }]);
      setSelectedOption(allOptions);
      console.log(orderProduct);
    } catch (error) {
      toast.error('Erro ao tentar criar um novo adicional!');
    }
  }

  /* eslint-disable */
  async function handleSelectChange(selectedOption: any) {
    setOrderProduct(selectedOption);
  }

  return (
    <MainContainer>
      <TopContainer>Criar Produto</TopContainer>
      <FormContainer onSubmit={handleSubmit}>
        <ContentContainer>
          <ContentColumn>
            <InputContainer>
              <Label htmlFor='name'>Nome</Label>
              <Input
                name='name'
                id='name'
                value={newOrder.clientName}
                onChange={editNewOrder}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='photoProduct'>Foto do Produto</Label>
              <Input
                name='photoProduct'
                id='photoProduct'
                type='url'
                value={newOrder.clientEmail}
                onChange={editNewOrder}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='products'>Adicionar Produtos:</Label>
              <InputSearchProducts
                name='products'
                id='products'
                options={allOptions}
                value={selectedOption}
                onChange={(option) => handleSelectChange(option)}
                placeholder='Selecione os adicionais'
                isMulti
              />
            </InputContainer>
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
