import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import {
  ContentContainer,
  MainContainer,
  SecondContainer,
  TitlePage,
  ContainerInfos,
  ContainerColumn,
  ContainerInput,
  LabelInputInfo,
  InputInfo,
  TitleAddress,
  ContainerCheckBox,
  TitleContainer,
  CheckBox,
  LabelCheckBox,
  ContainerOption,
  ContainerAllCheckbox,
  ContainerHorary,
  SecondContainerHorary,
  TitleHorary,
  InputHorary,
  LabelHorary,
  ContainerInputNameSite,
  ButtonUpdate,
  FormInfos,
} from './style';
import { toast } from 'react-toastify';
import { restaurantConfig } from '../../services/restaurantApi';
import useToken from '../../hooks/useToken';
import { RestaurantContext } from '../../contexts/restaurantContext';

export interface RestaurantType {
  nameRestaurant: string;
  photoProfile: string;
  photoCover: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  nameParamSite: string;
  deliveryOptions: string[];
  daysWeek: string[];
  openingHour: {
    ofTimeHour: string;
    ofTimeMinute: string;
    toTimeHour: string;
    toTimeMinute: string;
  };
}

export function Restaurant() {
  const {
    restaurant: restaurantContext,
    editRestaurantStorage,
    getRestaurant,
  } = useContext(RestaurantContext);
  const token = useToken();
  const [restaurant, setRestaurant] = useState<RestaurantType>({
    nameRestaurant: '',
    photoProfile: '',
    photoCover: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    nameParamSite: '',
    deliveryOptions: [],
    daysWeek: [],
    openingHour: {
      ofTimeHour: '',
      ofTimeMinute: '',
      toTimeHour: '',
      toTimeMinute: '',
    },
  });

  useEffect(() => {
    if (restaurantContext) return setRestaurant(restaurantContext);

    getRestaurant(token, setRestaurant);
  }, []);

  async function editRestaurant(e: ChangeEvent<HTMLInputElement>) {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  }

  async function editTime(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (e.target.name === 'ofTimeHour' || e.target.name === 'toTimeHour') {
      if (/^\d*$/.test(inputValue)) {
        const numValue = parseInt(inputValue, 10);
        if (numValue >= 0 && numValue <= 23) {
          setRestaurant({
            ...restaurant,
            openingHour: { ...restaurant.openingHour, [e.target.name]: e.target.value },
          });
        }
      }
    } else {
      if (/^\d*$/.test(inputValue)) {
        const numValue = parseInt(inputValue, 10);
        if (numValue >= 0 && numValue <= 59) {
          setRestaurant({
            ...restaurant,
            openingHour: { ...restaurant.openingHour, [e.target.name]: e.target.value },
          });
        }
      }
    }
  }

  async function selectOptionsDelivery(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      if (restaurant.deliveryOptions.length !== 0) {
        const existInDeliveryOptions = restaurant.deliveryOptions.find(
          (item) => item === e.target.name
        );
        if (existInDeliveryOptions) return;
      }
      setRestaurant({
        ...restaurant,
        deliveryOptions: [...restaurant.deliveryOptions, e.target.name],
      });
    } else {
      const newArr: string[] = restaurant.deliveryOptions.filter((item) => item !== e.target.name);
      setRestaurant({
        ...restaurant,
        deliveryOptions: newArr,
      });
    }
  }

  async function selectDaysWeek(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      if (restaurant.daysWeek.length !== 0) {
        const existInDeliveryOptions = restaurant.daysWeek.find((item) => item === e.target.name);
        if (existInDeliveryOptions) return;
      }
      setRestaurant({
        ...restaurant,
        daysWeek: [...restaurant.daysWeek, e.target.name],
      });
    } else {
      const newArr: string[] = restaurant.daysWeek.filter((item) => item !== e.target.name);
      setRestaurant({
        ...restaurant,
        daysWeek: newArr,
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await restaurantConfig(token, restaurant);
      editRestaurantStorage(response);
      toast.success('Atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao tentar atualizar informações!');
      console.log(error);
    }
  }

  return (
    <MainContainer>
      <SecondContainer>
        <SideBar page='restaurant' />
        <ContentContainer>
          <TitlePage>Configurações Restaurante</TitlePage>
          <FormInfos onSubmit={handleSubmit}>
            <ContainerInfos>
              <ContainerColumn border={true}>
                <ContainerInput>
                  <LabelInputInfo htmlFor='nameRestaurant'>Nome do Restaurante</LabelInputInfo>
                  <InputInfo
                    name='nameRestaurant'
                    value={restaurant.nameRestaurant}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInputInfo htmlFor='photoProfile'>Foto de Perfil</LabelInputInfo>
                  <InputInfo
                    name='photoProfile'
                    value={restaurant.photoProfile}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInputInfo htmlFor='photoCover'>Foto de Capa</LabelInputInfo>
                  <InputInfo
                    name='photoCover'
                    value={restaurant.photoCover}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <TitleAddress>Endereço</TitleAddress>
                <ContainerInput>
                  <LabelInputInfo htmlFor='street'>Rua</LabelInputInfo>
                  <InputInfo
                    name='street'
                    value={restaurant.street}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInputInfo htmlFor='neighborhood'>Bairro</LabelInputInfo>
                  <InputInfo
                    name='neighborhood'
                    value={restaurant.neighborhood}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInputInfo htmlFor='city'>Cidade</LabelInputInfo>
                  <InputInfo
                    name='city'
                    value={restaurant.city}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInputInfo htmlFor='state'>Estado</LabelInputInfo>
                  <InputInfo
                    name='state'
                    value={restaurant.state}
                    onChange={editRestaurant}
                    required
                  />
                </ContainerInput>
              </ContainerColumn>
              <ContainerColumn>
                <ContainerCheckBox>
                  <TitleContainer>Opções de entrega</TitleContainer>
                  <ContainerAllCheckbox>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='delivery'
                        value='delivery'
                        checked={restaurant.deliveryOptions.includes('delivery')}
                        onChange={selectOptionsDelivery}
                      />
                      <LabelCheckBox htmlFor='delivery'>Delivery</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='withdrawal'
                        value='withdrawal'
                        checked={restaurant.deliveryOptions.includes('withdrawal')}
                        onChange={selectOptionsDelivery}
                      />
                      <LabelCheckBox htmlFor='withdrawal'>Retirada</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='local'
                        value='local'
                        checked={restaurant.deliveryOptions.includes('local')}
                        onChange={selectOptionsDelivery}
                      />
                      <LabelCheckBox htmlFor='local'>No local</LabelCheckBox>
                    </ContainerOption>
                  </ContainerAllCheckbox>
                </ContainerCheckBox>
                <ContainerCheckBox>
                  <TitleContainer>Horários de Funcionamento</TitleContainer>
                  <ContainerAllCheckbox>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='sunday'
                        value='sunday'
                        checked={restaurant.daysWeek.includes('sunday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='sunday'>Dom</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='monday'
                        value='monday'
                        checked={restaurant.daysWeek.includes('monday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='monday'>Seg</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='tuesday'
                        value='tuesday'
                        checked={restaurant.daysWeek.includes('tuesday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='tuesday'>Ter</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='wednesday'
                        value='wednesday'
                        checked={restaurant.daysWeek.includes('wednesday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='wednesday'>Qua</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='thursday'
                        value='thursday'
                        checked={restaurant.daysWeek.includes('thursday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='thursday'>Qui</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='friday'
                        value='friday'
                        checked={restaurant.daysWeek.includes('friday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='friday'>Sex</LabelCheckBox>
                    </ContainerOption>
                    <ContainerOption>
                      <CheckBox
                        type='checkbox'
                        name='saturday'
                        value='saturday'
                        checked={restaurant.daysWeek.includes('saturday')}
                        onChange={selectDaysWeek}
                      />
                      <LabelCheckBox htmlFor='saturday'>Sab</LabelCheckBox>
                    </ContainerOption>
                  </ContainerAllCheckbox>
                  <ContainerHorary>
                    <SecondContainerHorary>
                      <TitleHorary>De:</TitleHorary>
                      <InputHorary
                        name='ofTimeHour'
                        value={restaurant.openingHour.ofTimeHour}
                        onChange={editTime}
                        type='number'
                        min='0'
                        max='23'
                        required
                      />
                      <LabelHorary htmlFor='ofTimeHour'>h</LabelHorary>
                      <InputHorary
                        name='ofTimeMinute'
                        value={restaurant.openingHour.ofTimeMinute}
                        onChange={editTime}
                        type='number'
                        min='0'
                        max='59'
                        required
                      />
                      <LabelHorary htmlFor='ofTimeMinute'>m</LabelHorary>
                    </SecondContainerHorary>
                    <SecondContainerHorary>
                      <TitleHorary>Até:</TitleHorary>
                      <InputHorary
                        name='toTimeHour'
                        value={restaurant.openingHour.toTimeHour}
                        onChange={editTime}
                        type='number'
                        min='0'
                        max='23'
                        required
                      />
                      <LabelHorary htmlFor='toTimeHour'>h</LabelHorary>
                      <InputHorary
                        name='toTimeMinute'
                        value={restaurant.openingHour.toTimeMinute}
                        onChange={editTime}
                        type='number'
                        min='0'
                        max='59'
                        required
                      />
                      <LabelHorary htmlFor='toTimeMinute'>m</LabelHorary>
                    </SecondContainerHorary>
                  </ContainerHorary>
                  <ContainerInputNameSite>
                    <LabelInputInfo htmlFor='nameParamSite'>Nome do Site</LabelInputInfo>
                    <InputInfo
                      name='nameParamSite'
                      value={restaurant.nameParamSite}
                      onChange={editRestaurant}
                      required
                      placeholder='Ex: "nomedosite" tudo junto'
                    />
                  </ContainerInputNameSite>
                </ContainerCheckBox>
              </ContainerColumn>
            </ContainerInfos>
            <ButtonUpdate>Atualizar</ButtonUpdate>
          </FormInfos>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
