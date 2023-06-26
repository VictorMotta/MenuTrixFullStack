import {
  ContainerColumnTop,
  ContainerInfo,
  DescProduct,
  AvailabilityInfo,
  ImgProduct,
  MainContainer,
  NameProduct,
  ContainerTop,
  ContainerInfoProduct,
  ContainerColumnInfoProduct,
  TitleDescription,
  DescriptionProduct,
  ContainerButtons,
  ContainerPriceProduct,
  PriceProduct,
  ContainerColumnButtons,
  Button,
  TitleAdditionalAvailable,
  ContainerAdditionalAvailable,
  AdditionalAvailable,
  ContainerNotHasAdditional,
  TitleNotHasAdditional,
  ContainerAvailable,
  Input,
  TextArea,
  ContainerPriceInput,
  PriceInput,
  InputContainer,
  InputSearchAdditionals,
} from './style';
import LOGORESTAURANTE from '../../assets/img/logoHamburger.png';
import { Switch } from '@nextui-org/react';
import useToken from '../../hooks/useToken';
import { ProductRes } from '../../pages';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { alterAvailableProduct, alterProduct } from '../../services/productApi';
import { toast } from 'react-toastify';
import { convertCents, currency, currencyValue } from '../../functions/masks';
import { AdditionalDB, getAllAdditionalsAvailable } from '../../services/additionalApi';

interface PropsProductItem {
  item: ProductRes;
  product: ProductRes[];
  setProduct: Dispatch<SetStateAction<ProductRes[] | undefined>>;
  loadingPage: boolean;
  setLoadingPage: Dispatch<SetStateAction<boolean>>;
}

interface Option {
  value: string;
  label: string;
}

type ArrayProduct = {
  Additional: { id: number; name: string };
}[];

export function ProductItem({
  item,
  product,
  setProduct,
  loadingPage,
  setLoadingPage,
}: PropsProductItem) {
  const [productEdited, setProductEdited] = useState<ProductRes>({} as ProductRes);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const nameProduct = useRef<HTMLInputElement>(null);
  const descProduct = useRef<HTMLTextAreaElement>(null);
  const priceProduct = useRef<HTMLInputElement>(null);

  const token = useToken();
  const valueCents = String(item.price);
  let checked = item.isAvailable;
  let price = valueCents.replace(/\D/g, '');
  price = price.replace(/(\d)(\d{2})$/, '$1,$2');
  price = price.replace(/(?=(\d{3})+(\D))\B/g, '.');
  let additionals = [] as AdditionalDB[];

  useEffect(() => {
    getAllAdditionals();

    const thisProduct = product.find((object) => object.id === item.id) as ProductRes;
    console.log(thisProduct);

    getOptions(thisProduct.ProductAdditional);
    thisProduct.price = currencyValue(String(thisProduct.price)) as string;

    setProductEdited({ ...thisProduct, photoProduct: '' });

    /* eslint-disable */
  }, []);

  async function getAllAdditionals() {
    try {
      additionals = await getAllAdditionalsAvailable(token);
      const options: { value: string; label: string }[] = additionals.map((item) => {
        return { value: String(item.id), label: item.name };
      });
      setAllOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  function getOptions(array: ArrayProduct) {
    const options: { value: string; label: string }[] = array.map((item) => {
      return { value: String(item.Additional.id), label: item.Additional.name };
    });

    setSelectedOption(options);
  }

  async function alterAvailable() {
    const body = {
      isAvailable: !item.isAvailable,
    };
    try {
      const result = await alterAvailableProduct(token, item.id, body);
      const newArr = product.map((item) => {
        if (item.id === result.id) {
          return result;
        }
        return item;
      });

      setProduct(newArr);
    } catch (error) {
      checked = item.isAvailable;
      toast.error('Erro ao tentar deixar indisponível, Tente recarregar a pagina!');
    }
  }
  async function handleAlterProduct() {
    try {
      const price = convertCents(String(productEdited.price));

      if (selectedOption) {
        productEdited.ProductAdditional = selectedOption.map((object) => {
          return { Additional: { id: +object.value, name: object.label } };
        });
      }

      const body = {
        name: productEdited.name,
        price: price,
        description: productEdited.description,
        photoProduct: !productEdited.photoProduct ? item.photoProduct : productEdited.photoProduct,
        ProductAdditional: productEdited.ProductAdditional,
      };
      const response = await alterProduct(token, item.id, body);

      getOptions(response.ProductAdditional);

      response.photoProduct = '';
      setProductEdited(response);

      setLoadingPage(!loadingPage);

      setEditProduct(false);
      setOpenInfo(false);

      toast.success('Alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao tentar criar um novo adicional!');
    }
  }

  const changeProduct = useCallback(
    (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      let formattedValue = value;

      if (name === 'price') {
        formattedValue = currency(e);
      }

      const newInfo = { ...productEdited, [name]: formattedValue };
      setProductEdited(newInfo);
    },
    [productEdited]
  );

  async function handleSelectChange(selectedOption: any) {
    setSelectedOption(selectedOption);
  }

  function canceled() {
    const options: { value: string; label: string }[] = additionals.map((item) => {
      return { value: String(item.id), label: item.name };
    });
    setAllOptions(options);
    setEditProduct(false);
  }

  return (
    <MainContainer>
      <ContainerTop open={openInfo}>
        <ContainerColumnTop
          pointer='pointer'
          onClick={() => !editProduct && setOpenInfo(!openInfo)}
        >
          <ImgProduct src={item.photoProduct ? item.photoProduct : LOGORESTAURANTE} />
          <ContainerInfo>
            {!editProduct ? (
              <>
                <NameProduct>{item.name.toLocaleLowerCase()}</NameProduct>
                <DescProduct>{item.description}</DescProduct>
              </>
            ) : (
              <>
                <Input
                  type='url'
                  name='photoProduct'
                  value={productEdited && productEdited.photoProduct}
                  onChange={changeProduct}
                  placeholder='Caso não queira alterar a foto, deixe em branco!'
                  required
                />
                <Input
                  type='text'
                  ref={nameProduct}
                  name='name'
                  value={productEdited && productEdited.name.toLocaleLowerCase()}
                  onChange={changeProduct}
                  required
                />
              </>
            )}
          </ContainerInfo>
        </ContainerColumnTop>
        <ContainerColumnTop justify='flex-end'>
          <ContainerAvailable onClick={alterAvailable}>
            <AvailabilityInfo>Disponibilidade:</AvailabilityInfo>
            <Switch bordered color='success' checked={checked} />
          </ContainerAvailable>
        </ContainerColumnTop>
      </ContainerTop>
      {openInfo && (
        <>
          <ContainerInfoProduct>
            <ContainerColumnInfoProduct right_border='1px solid #000000'>
              <TitleDescription>Descrição: </TitleDescription>
              {!editProduct ? (
                <DescriptionProduct>{item.description}</DescriptionProduct>
              ) : (
                <TextArea
                  defaultValue={productEdited && productEdited.description}
                  ref={descProduct}
                  name='description'
                  value={productEdited && productEdited.description}
                  onChange={changeProduct}
                  required
                />
              )}
              <ContainerPriceProduct>
                <PriceProduct>Valor:</PriceProduct>
                {!editProduct ? (
                  <PriceProduct>R$: {price}</PriceProduct>
                ) : (
                  <ContainerPriceInput>
                    R${' '}
                    <PriceInput
                      type='text'
                      ref={priceProduct}
                      name='price'
                      value={productEdited && productEdited.price}
                      onChange={changeProduct}
                      required
                    />
                  </ContainerPriceInput>
                )}
              </ContainerPriceProduct>
            </ContainerColumnInfoProduct>
            <ContainerColumnInfoProduct left_border='1px solid #000000'>
              {editProduct ? (
                <>
                  <TitleAdditionalAvailable>Adicionais Disponível:</TitleAdditionalAvailable>
                  <InputContainer>
                    <InputSearchAdditionals
                      name='additionals'
                      id='additionals'
                      options={allOptions}
                      value={selectedOption}
                      onChange={(option) => {
                        handleSelectChange(option);
                      }}
                      placeholder='Selecione os adicionais'
                      isMulti
                    />
                  </InputContainer>
                  <ContainerAdditionalAvailable>
                    {selectedOption[0] &&
                      selectedOption.map((item) => (
                        <AdditionalAvailable>{item.label}</AdditionalAvailable>
                      ))}
                  </ContainerAdditionalAvailable>
                </>
              ) : item.ProductAdditional[0] ? (
                <>
                  <TitleAdditionalAvailable>Adicionais Disponível:</TitleAdditionalAvailable>
                  <ContainerAdditionalAvailable>
                    {item.ProductAdditional[0] &&
                      item.ProductAdditional.map((item) => (
                        <AdditionalAvailable>{item.Additional.name}</AdditionalAvailable>
                      ))}
                  </ContainerAdditionalAvailable>
                </>
              ) : (
                <ContainerNotHasAdditional>
                  <TitleNotHasAdditional>
                    Adicione um adicional para aparecer aqui
                  </TitleNotHasAdditional>
                </ContainerNotHasAdditional>
              )}
            </ContainerColumnInfoProduct>
          </ContainerInfoProduct>
          {editProduct ? (
            <ContainerButtons>
              <ContainerColumnButtons alignContentFlex='center'>
                <Button onClick={handleAlterProduct}>Alterar Produto</Button>
              </ContainerColumnButtons>
              <ContainerColumnButtons alignContentFlex='center'>
                <Button onClick={canceled}>Cancelar</Button>
              </ContainerColumnButtons>
            </ContainerButtons>
          ) : (
            <ContainerButtons>
              <ContainerColumnButtons alignContentFlex='center'>
                <Button onClick={() => setEditProduct(true)}>Editar Produto</Button>
              </ContainerColumnButtons>
            </ContainerButtons>
          )}
        </>
      )}
    </MainContainer>
  );
}
