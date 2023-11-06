import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import SideBar from '../../components/SideBar';
import { MdAddCircle } from 'react-icons/md';
import {
  ButtonCreate,
  ContainerCreateSearch,
  ContainerNotHasProduct,
  ContainerProducts,
  ContentContainer,
  MainContainer,
  NotHasProduct,
  SecondContainer,
} from './style';
import { SearchInput } from '../../components/SearchInput';
import { CreateProduct } from '../../components/CreateProduct';
import { ProductItem } from '../../components/ProductItem';
import { getAllProducts, getProductSearch } from '../../services/productApi';
import useToken from '../../hooks/useToken';
import { MenuContext } from '../../contexts/menuContext';
import BottomBarMobile from '../../components/BottomBarMobile';
import SideBarConfig from '../../components/SideBarConfig';
import { ButtonSquareCreate, IconPlusSquareCreate } from '../../components/BottomBarMobile/style';

interface SearchType {
  search: string;
}

export interface ProductRes {
  id: number;
  name: string;
  photoProduct: string;
  price: number | string;
  hasMeatPoint: boolean;
  isAvailable: boolean;
  description: string;
  ProductAdditional: {
    id: number; name: string; price: number;
  }[];
  ProductCategory: {
    Category: {
      id: true;
      name: true;
    };
  }[];
  AdditionalsSelected?: {
    id: number; name: string; price: number;
  }[];
}

export function Product() {
  const token = useToken();
  const [selected, setSelected] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchType>({ search: '' } as SearchType);
  const clickedInput = search.search === '';
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const [product, setProduct] = useState<undefined | ProductRes[]>(undefined);

  const { alterButtonMenu, resetDados } = useContext(MenuContext);

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    setSearch({ ...search, [e.currentTarget.name]: e.currentTarget.value });
    typingTimer.current = setTimeout(startFunction, 500);
  };

  async function startFunction() {
    if (search.search === '') {
      return setLoadingPage(!loadingPage);
    }
    try {
      const response = await getProductSearch(token, search.search);
      setProduct(response);
    } catch (error) {
      setLoadingPage(!loadingPage);
    }
  }

  useEffect(() => {
    getProducts();
    resetDados();
  }, [loadingPage]);

  async function getProducts() {
    try {
      const response = await getAllProducts(token);
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='produtos' />
          <ContentContainer>
            <ContainerCreateSearch>
              {!selected ? (
                <>
                  <ButtonCreate onClick={() => setSelected(true)}>
                    <MdAddCircle />
                    <h1>Criar</h1>
                  </ButtonCreate>
                  <SearchInput
                    placeholder='Digite o nome do produto'
                    name='search'
                    onKeyUp={handleSearchChange}
                    value={search.search}
                    selected={clickedInput}
                  />
                </>
              ) : (
                <CreateProduct
                  setSelected={setSelected}
                  setLoadingPage={setLoadingPage}
                  loadingPage={loadingPage}
                />
              )}
            </ContainerCreateSearch>
            <ContainerProducts>
              {product ? (
                <>
                  {product.map((item: ProductRes) => (
                    <ProductItem
                      key={item.id}
                      item={item}
                      product={product}
                      setProduct={setProduct}
                      loadingPage={loadingPage}
                      setLoadingPage={setLoadingPage}
                    />
                  ))}
                </>
              ) : (
                <ContainerNotHasProduct>
                  <NotHasProduct>Adicione um produto para aparecer aqui!</NotHasProduct>
                </ContainerNotHasProduct>
              )}
            </ContainerProducts>
          </ContentContainer>
        </SecondContainer>
      </MainContainer>
      <BottomBarMobile >
        <ButtonSquareCreate hidden={alterButtonMenu}>
          <IconPlusSquareCreate />
        </ButtonSquareCreate>
      </BottomBarMobile>
      <SideBarConfig />
    </>
  );
}
