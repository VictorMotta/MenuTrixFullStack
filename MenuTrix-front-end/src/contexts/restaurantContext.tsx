import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { RestaurantType } from '../pages';
import { getRestaurantConfig } from '../services/restaurantApi';

interface RestaurantContextProps {
  children: ReactNode;
}

export type RestaurantState = undefined | RestaurantType;

type RestaurantContextData = {
  restaurant: RestaurantState;
  setRestaurant: Dispatch<SetStateAction<RestaurantState>>;
  editRestaurantStorage: (data: RestaurantState) => void;
  clearRestaurant: () => void;
  getRestaurant: (
    token?: string,
    setParam?: Dispatch<React.SetStateAction<RestaurantType>>
  ) => void;
};

const RestaurantContext = createContext<RestaurantContextData>({} as RestaurantContextData);

const RestaurantContextProvider: React.FC<RestaurantContextProps> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<RestaurantState>(undefined);

  console.log(restaurant);
  useEffect(() => {
    const recoveredRestaurant = localStorage.getItem('restaurant');

    if (recoveredRestaurant) {
      setRestaurant(JSON.parse(recoveredRestaurant));
    }
  }, []);

  async function getRestaurant(
    token?: string,
    setParam?: Dispatch<React.SetStateAction<RestaurantType>>
  ) {
    try {
      const response = await getRestaurantConfig(token);
      setRestaurant(response);

      const recoveredRestaurant = localStorage.getItem('restaurant');
      console.log(recoveredRestaurant);
      editRestaurantStorage(response);

      if (setParam) {
        setParam(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function clearRestaurant() {
    localStorage.removeItem('restaurant');
    setRestaurant(undefined);
  }

  const editRestaurantStorage = (data: RestaurantState) => {
    localStorage.setItem('restaurant', JSON.stringify(data));

    setRestaurant(data);
  };

  const contextData: RestaurantContextData = {
    restaurant,
    setRestaurant,
    editRestaurantStorage,
    clearRestaurant,
    getRestaurant,
  };

  return <RestaurantContext.Provider value={contextData}>{children}</RestaurantContext.Provider>;
};

export { RestaurantContext, RestaurantContextProvider };
