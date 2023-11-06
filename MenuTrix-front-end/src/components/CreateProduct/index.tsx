import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Button,
  ButtonsContainer,
  CheckBoxContainer,
  CheckboxLabel,
  CheckmarkContainer,
  CheckmarkIcon,
  ContainerAdditional,
  ContentColumn,
  ContentContainer,
  FormContainer,
  Input,
  InputCheckBox,
  InputContainer,
  InputSearchAdditionals,
  Label,
  MainContainer,
  MainContainerAdditional,
  TopContainer,
} from './style';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { convertCents, currency } from '../../functions/masks';
import { getAllAdditionalsAvailable } from '../../services/additionalApi';
import { createProduct } from '../../services/productApi';

interface PropsCreateProduct {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductBody {
  name: string;
  photoProduct: string;
  price: string | number;
  description: string;
  hasMeatPoint: boolean;
  additionals: { id: number }[];
  category: string;
}

interface Option {
  value: string;
  label: string;
}

export function CreateProduct({ setSelected, loadingPage, setLoadingPage }: PropsCreateProduct) {
  const token = useToken();
  const [newProduct, setNewProduct] = useState<ProductBody>({
    name: '',
    photoProduct: '',
    price: '',
    description: '',
    hasMeatPoint: false,
    additionals: [],
    category: '',
  });
  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  useEffect(() => {
    getAllAdditionals();
  }, []);

  async function getAllAdditionals() {
    try {
      const additionals = await getAllAdditionalsAvailable(token);
      const options: { value: string; label: string }[] = additionals.map((item) => {
        return { value: String(item.id), label: item.name };
      });
      setAllOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const price = convertCents(String(newProduct.price));

      const body = {
        ...newProduct,
        price: price,
        additionals: selectedOption.map((item) => ({
          id: Number(item.value),
        })),
      };

      await createProduct(token, body);
      setLoadingPage(!loadingPage);
      setSelected(false);
      toast.success('Adicional criado!');
    } catch (error) {
      toast.error('Erro ao tentar criar um novo adicional!');
    }
  }

  const editNewProduct = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      let formattedValue = value;

      if (name === 'price') {
        formattedValue = currency(e);
      }

      const newInfo = { ...newProduct, [name]: formattedValue };
      setNewProduct(newInfo);
    },
    [newProduct]
  );

  function handleChecked() {
    setNewProduct({ ...newProduct, hasMeatPoint: !newProduct.hasMeatPoint });
  }
  /* eslint-disable */
  async function handleSelectChange(selectedOption: any) {
    setSelectedOption(selectedOption);
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
                value={newProduct.name}
                onChange={editNewProduct}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='photoProduct'>Foto do Produto</Label>
              <Input
                name='photoProduct'
                id='photoProduct'
                type='url'
                value={newProduct.photoProduct}
                onChange={editNewProduct}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='category'>Categoria</Label>
              <Input
                name='category'
                id='category'
                value={newProduct.category}
                onChange={editNewProduct}
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='description'>Descrição</Label>
              <Input
                name='description'
                id='description'
                value={newProduct.description}
                onChange={editNewProduct}
                required
              />
            </InputContainer>
          </ContentColumn>
          <ContentColumn>
            <InputContainer>
              <Label htmlFor='price'>Valor</Label>
              <Input
                name='price'
                id='price'
                value={newProduct.price}
                onChange={editNewProduct}
                required
                placeholder='Digite sempre começando pelos centavos ex: 00'
              />
            </InputContainer>
            <CheckBoxContainer>
              <CheckmarkContainer>
                <InputCheckBox checked={newProduct.hasMeatPoint} onChange={handleChecked} />
                <CheckmarkIcon className='checkmark' />
              </CheckmarkContainer>
              <CheckboxLabel>Tem ponto de carne?</CheckboxLabel>
            </CheckBoxContainer>
            <InputContainer>
              <Label htmlFor='additionals'>Adicionais Disponíveis para o produto</Label>
              <InputSearchAdditionals
                name='additionals'
                id='additionals'
                options={allOptions}
                value={selectedOption}
                onChange={(option) => handleSelectChange(option)}
                placeholder='Selecione os adicionais'
                isMulti
              />
            </InputContainer>

            {selectedOption && (
              <MainContainerAdditional>
                {selectedOption.map((option) => (
                  <ContainerAdditional key={option.value}>{option.label}</ContainerAdditional>
                ))}
              </MainContainerAdditional>
            )}
          </ContentColumn>
        </ContentContainer>
        <ButtonsContainer>
          <Button type='submit'>Criar</Button>
          <Button onClick={() => setSelected(false)}>Cancelar</Button>
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
}
