import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AdditionalItem } from '../../components/AdditionalItem';
import { SearchInput } from '../../components/SearchInput';
import SideBar from '../../components/SideBar';
import {
  ButtonCreate,
  ContainerContentAdditional,
  ContainerCreateSearch,
  ContainerNotHasAdditional,
  ContentContainer,
  MainContainer,
  NotHasAdditional,
  SecondContainer,
} from './style';
import { MdAddCircle } from 'react-icons/md';
import { CreateAdditional } from '../../components/CreateAdditional';
import { getAdditionalSearch, getAllAdditionals } from '../../services/additionalApi';
import useToken from '../../hooks/useToken';
import { MenuContext } from '../../contexts/menuContext';
import BottomBarMobile from '../../components/BottomBarMobile';
import { ButtonSquareCreate, IconPlusSquareCreate } from '../../components/BottomBarMobile/style';
import SideBarConfig from '../../components/SideBarConfig';

export interface AdditionalRes {
  id?: number;
  name: string;
  isAvailable: boolean;
  price: number;
  restaurantId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SearchType {
  search: string;
}

export function Additional() {
  const token = useToken();
  const [selected, setSelected] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchType>({ search: '' } as SearchType);
  const clickedInput = search.search === '';
  const [additionals, setAdditionals] = useState<AdditionalRes[]>([] as AdditionalRes[]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
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
      const response = await getAdditionalSearch(token, search.search);
      setAdditionals(response);
    } catch (error) {
      setLoadingPage(!loadingPage);
    }
  }

  useEffect(() => {
    getAdditionals();
    resetDados();
  }, [loadingPage]);

  async function getAdditionals() {
    try {
      const response = await getAllAdditionals(token);
      setAdditionals(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MainContainer>
        <SecondContainer>
          <SideBar page='adicionais' />
          <ContentContainer>
            <ContainerCreateSearch>
              {!selected ? (
                <>
                  <ButtonCreate onClick={() => setSelected(true)}>
                    <MdAddCircle />
                    <h1>Criar</h1>
                  </ButtonCreate>
                  <SearchInput
                    placeholder='Digite o nome do adicional'
                    name='search'
                    onKeyUp={handleSearchChange}
                    value={search.search}
                    selected={clickedInput}
                  />
                </>
              ) : (
                <CreateAdditional
                  setSelected={setSelected}
                  setLoadingPage={setLoadingPage}
                  loadingPage={loadingPage}
                />
              )}
            </ContainerCreateSearch>
            <ContainerContentAdditional>
              {additionals[0] ? (
                additionals.map((item) => (
                  <AdditionalItem
                    key={item.id}
                    item={item}
                    additionals={additionals}
                    setAdditionals={setAdditionals}
                  />
                ))
              ) : (
                <ContainerNotHasAdditional>
                  <NotHasAdditional>Adicione um adicional para aparecer aqui!</NotHasAdditional>
                </ContainerNotHasAdditional>
              )}
            </ContainerContentAdditional>
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
