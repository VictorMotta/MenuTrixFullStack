import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/authContext';
import { Private } from './components/Authenticated';
import { DataAndSecurity, Order, Product, Restaurant, SignIn, SignUp } from './pages';
import { RestaurantContextProvider } from './contexts/restaurantContext';
import { Additional } from './pages/Additional';
import { Client } from './pages/Client';
import { Financial } from './pages/Financial';
import { Estoque } from './pages/Stock';
import { NotFoundPage } from './pages/NotFound';
import TopBar from './components/TopBar';
import { MenuContextProvider } from './contexts/menuContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RestaurantContextProvider>
          <MenuContextProvider>
            <ToastContainer
              position='top-right'
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <TopBar />
            <Routes>
              <Route path='/' element={<SignIn />} />
              <Route path='/cadastro' element={<SignUp />} />
              <Route
                path='/config/restaurante'
                element={
                  <Private>
                    <Restaurant />
                  </Private>
                }
              />
              <Route
                path='/config/dados-e-segurança'
                element={
                  <Private>
                    <DataAndSecurity />
                  </Private>
                }
              />
              <Route
                path='/produtos'
                element={
                  <Private>
                    <Product />
                  </Private>
                }
              />
              <Route
                path='/pedidos'
                element={
                  <Private>
                    <Order />
                  </Private>
                }
              />
              <Route
                path='/adicionais'
                element={
                  <Private>
                    <Additional />
                  </Private>
                }
              />
              <Route
                path='/clientes'
                element={
                  <Private>
                    <Client />
                  </Private>
                }
              />
              <Route
                path='/financeiro'
                element={
                  <Private>
                    <Financial />
                  </Private>
                }
              />
              <Route
                path='/estoque'
                element={
                  <Private>
                    <Estoque />
                  </Private>
                }
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </MenuContextProvider>
        </RestaurantContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
