import { conflictError } from '@/errors';
import { notFoundError } from '@/errors/not-found-error';
import productsRepository from '@/repositories/products-repository';
import restaurantsRepository from '@/repositories/restaurants-repository';
import { ProductBody, UpdateProductBody } from '@/schemas';

async function getAllProducts(userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const product = await productsRepository.getAllProducts(restaurant.id);
  return product;
}

async function getProductsByName(name: string, userId: number) {
  if (!name) throw notFoundError();

  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionals = await productsRepository.getProductsContainsName(name, restaurant.id);
  return additionals;
}

async function createProduct(body: ProductBody, userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const ProductExist = await productsRepository.getProductByName(
    body.name.toLocaleUpperCase(),
    restaurant.id
  );
  if (ProductExist) throw conflictError();

  const productId = await productsRepository.createProduct(body, restaurant.id);
  if (!productId) throw conflictError();

  const product = await productsRepository.getProductById(productId, restaurant.id);
  return product;
}

async function alterAvailableProduct(isAvailable: boolean, idProduct: number, userId: number) {
  if (typeof idProduct !== 'number' || Number.isNaN(idProduct)) throw conflictError();

  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const productExist = await productsRepository.getProductById(idProduct, restaurant.id);
  if (!productExist) throw notFoundError();

  if (productExist.isAvailable === isAvailable) throw conflictError();

  await productsRepository.alterAvailable(idProduct, isAvailable);

  const product = productsRepository.getProductById(idProduct, restaurant.id);
  return product;
}

async function alterProduct(body: UpdateProductBody, idProduct: number, userId: number) {
  if (typeof idProduct !== 'number' || Number.isNaN(idProduct)) throw conflictError();

  console.log(body.ProductAdditional);
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const productExist = await productsRepository.getProductById(idProduct, restaurant.id);
  if (!productExist) throw notFoundError();

  await productsRepository.alterProduct(idProduct, body);

  const product = productsRepository.getProductById(idProduct, restaurant.id);
  return product;
}

const productsService = {
  getAllProducts,
  getProductsByName,
  createProduct,
  alterAvailableProduct,
  alterProduct,
};

export default productsService;
