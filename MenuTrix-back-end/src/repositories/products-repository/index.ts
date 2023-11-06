import { prisma } from '@/config';
import { ProductBody, UpdateProductBody } from '@/schemas';
import { Additional } from '@prisma/client';

export interface GetProductType {
  id: number;
  name: string;
  photoProduct: string;
  price: number;
  description: string;
  hasMeatPoint: boolean;
  isAvailable: boolean;
  ProductAdditional: {
    Additional: {
      id: number;
      name: string;
      price: number;
    }
  }[];
  ProductCategory: {
    Category: {
      id: number;
      name: string;
    };
  }[];
}

async function getProductById(id: number, restaurantId: number): Promise<GetProductType> {
  const product: any  = await prisma.product.findFirst({
    where: {
      AND: [{ id }, { restaurantId }],
    },
    select: {
      id: true,
      name: true,
      photoProduct: true,
      price: true,
      hasMeatPoint: true,
      isAvailable: true,
      description: true,
      ProductAdditional: {
        select: {
          Additional: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      ProductCategory: {
        select: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  product.ProductAdditional = product.ProductAdditional.map((item : any) => item.Additional);

  return product;
}

async function getAllProducts(restaurantId: number): Promise<GetProductType[]> {
  const products: any = await prisma.product.findMany({
    where: {
      restaurantId,
    },
    select: {
      id: true,
      name: true,
      photoProduct: true,
      price: true,
      hasMeatPoint: true,
      isAvailable: true,
      description: true,
      ProductAdditional: {
        where: {
          Additional: {
            isAvailable: true,
          },
        },
        select: {
          Additional: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      ProductCategory: {
        select: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      isAvailable: 'desc',
    },
  });

  for (const product of products){
    product.ProductAdditional = product.ProductAdditional.map((item : any) => item.Additional);
  }
  return products;
}

async function getProductsContainsName(name: string, restaurantId: number) {
  const products: any = await prisma.product.findMany({
    where: {
      AND: [
        {
          name: {
            contains: name.toLocaleUpperCase(),
          },
        },
        { restaurantId },
      ],
    },
    select: {
      id: true,
      name: true,
      photoProduct: true,
      price: true,
      hasMeatPoint: true,
      isAvailable: true,
      description: true,
      ProductAdditional: {
        where: {
          Additional: {
            isAvailable: true,
          },
        },
        select: {
          Additional: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      ProductCategory: {
        select: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      isAvailable: 'desc',
    },
  });

  for (const product of products){
    product.ProductAdditional = product.ProductAdditional.map((item : any) => item.Additional);
  }
  return products;
}

async function getProductByName(name: string, restaurantId: number) {
  return await prisma.product.findFirst({
    where: {
      AND: [{ name }, { restaurantId }],
    },
  });
}

async function getAllProductsAvailable(restaurantId: number) {
  const products: any = await prisma.product.findMany({
    where: {
      AND: [{ restaurantId }, { isAvailable: true }],
    },
    select: {
      id: true,
      name: true,
      photoProduct: true,
      price: true,
      hasMeatPoint: true,
      isAvailable: true,
      description: true,
      ProductAdditional: {
        where: {
          Additional: {
            isAvailable: true,
          },
        },
        select: {
          Additional: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      ProductCategory: {
        select: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  
  for (const product of products){
    if(product.ProductAdditional[0]){
      product.ProductAdditional = product.ProductAdditional.map((item : any) => item.Additional);
    }
  }
  return products;
}

async function getAllProductsAvailableByName(name: string, restaurantId: number) {
  const products:any = await prisma.product.findMany({
    where: {
      AND: [
        {
          name: {
            contains: name.toLocaleUpperCase(),
          },
        },
        { restaurantId },
        { isAvailable: true },
      ],
    },
    select: {
      id: true,
      name: true,
      photoProduct: true,
      price: true,
      hasMeatPoint: true,
      isAvailable: true,
      description: true,
      ProductAdditional: {
        where: {
          Additional: {
            isAvailable: true,
          },
        },
        select: {
          Additional: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      ProductCategory: {
        select: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  for (const product of products){
    product.ProductAdditional = product.ProductAdditional.map((item : any) => item.Additional);
  }
  return products;
}

async function createProduct(body: ProductBody, restaurantId: number) {
  return await prisma.$transaction(async (prisma) => {
    const existingCategory = await prisma.category.findUnique({
      where: { name: body.category },
    });

    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const createdCategory = await prisma.category.create({
        data: {
          name: body.category,
        },
      });
      categoryId = createdCategory.id;
    }

    const createdProduct = await prisma.product.create({
      data: {
        name: body.name.toLocaleUpperCase(),
        photoProduct: body.photoProduct,
        price: body.price,
        restaurantId,
        description: body.description,
        hasMeatPoint: body.hasMeatPoint,
        ProductCategory: {
          create: {
            categoryId,
          },
        },
      },
      include: {
        ProductCategory: {
          include: {
            Category: true,
          },
        },
      },
    });

    if (body.additionals[0]) {
      for (let i = 0; i < body.additionals.length; i++) {
        await prisma.productAdditional.create({
          data: {
            productId: createdProduct.id,
            additionalId: body.additionals[i].id,
          },
        });
      }
    }

    return createdProduct.id;
  });
}

async function alterAvailable(id: number, isAvailable: boolean) {
  return await prisma.product.update({
    where: { id },
    data: {
      isAvailable,
    },
  });
}

async function alterProduct(id: number, data: UpdateProductBody) {
  await prisma.$transaction(async (prisma) => {
    await prisma.productAdditional.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name.toLocaleUpperCase(),
        description: data.description,
        price: +data.price,
        photoProduct: data.photoProduct,
      },
    });

    for (let i = 0; i < data.ProductAdditional.length; i++) {
      await prisma.productAdditional.create({
        data: {
          additionalId: data.ProductAdditional[i].id,
          productId: id,
        },
      });
    }
  });
}

const productsRepository = {
  getProductById,
  getAllProducts,
  getProductByName,
  getProductsContainsName,
  getAllProductsAvailable,
  getAllProductsAvailableByName,
  createProduct,
  alterAvailable,
  alterProduct,
};

export default productsRepository;
