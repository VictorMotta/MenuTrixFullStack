import { FormEvent, useEffect, useRef, useState } from 'react';
import SideBar from '../../components/SideBar';
import {
  ButtonCreate,
  ContainerContentClient,
  ContainerCreateSearch,
  ContainerNotHasClient,
  ContentContainer,
  MainContainer,
  NotHasClient,
  SecondContainer,
} from './style';
import { MdAddCircle } from 'react-icons/md';
import { SearchInput } from '../../components/SearchInput';
import { CreateClient } from '../../components/CreateClient';
import { ClientItem } from '../../components/ClientItem';
import { getAllClients } from '../../services/clientApi';
import useToken from '../../hooks/useToken';

interface SearchType {
  search: string;
}

export interface ClientRes {
  id: number;
  name: string;
  email: string;
  telephone: string;
  Address: {
    id: number;
    street: string;
    numberHouse: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string | null;
  }[];
}

export function Client() {
  const token = useToken();
  const [clients, setClients] = useState<ClientRes[]>([] as ClientRes[]);
  const [search, setSearch] = useState<SearchType>({ search: '' } as SearchType);
  const [selected, setSelected] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const clickedInput = search.search === '';

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    setSearch({ ...search, [e.currentTarget.name]: e.currentTarget.value });
    typingTimer.current = setTimeout(startFunction, 500);
  };
  useEffect(() => {
    getClients();
  }, [loadingPage]);
  async function getClients() {
    try {
      const response = await getAllClients(token);
      setClients(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function startFunction() {
    if (search.search === '') {
      return setLoadingPage(!loadingPage);
    }
    try {
      // chama a promisse
      // seta o setClient com a response
    } catch (error) {
      setLoadingPage(!loadingPage);
    }
  }

  return (
    <MainContainer>
      <SecondContainer>
        <SideBar page='clientes' />
        <ContentContainer>
          <ContainerCreateSearch>
            {!selected ? (
              <>
                <ButtonCreate onClick={() => setSelected(true)}>
                  <MdAddCircle />
                  <h1>Criar</h1>
                </ButtonCreate>
                <SearchInput
                  placeholder='Digite o nome do cliente'
                  name='search'
                  onKeyUp={handleSearchChange}
                  value={search.search}
                  selected={clickedInput}
                />
              </>
            ) : (
              <CreateClient setSelected={setSelected} clients={clients} setClients={setClients} />
            )}
          </ContainerCreateSearch>
          <ContainerContentClient>
            {clients[0] ? (
              clients.map((item) => <ClientItem item={item} />)
            ) : (
              <ContainerNotHasClient>
                <NotHasClient>Adicione um cliente para aparecer aqui!</NotHasClient>
              </ContainerNotHasClient>
            )}
          </ContainerContentClient>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
