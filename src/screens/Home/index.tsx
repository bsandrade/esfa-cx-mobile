import React, {useState} from 'react';
import {
  Container,
  HomeCheckoutButton,
  ProductList,
  ProductSeparator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {Product} from '@components/Product';
import {
  CreateProductType,
  NavigationType,
  ProductItemType,
  ScreenProps,
} from '@src/types';
import {DetailsModal} from '@components/Modals/DetailsModal';
import {useToastApp} from '@hooks/toast-app';
import {useStorage} from '@hooks/storage';

const productsApi: Array<CreateProductType> = [
  {
    name: 'Coxinha',
    price: 4.75,
    type: 'food',
  },
  {
    name: 'Refrigerante',
    price: 5.0,
    type: 'drink',
  },
  {
    name: 'Suco',
    price: 2.5,
    type: 'drink',
  },
  {
    name: 'Pastel de Frango',
    price: 4.75,
    type: 'food',
  },
  {
    name: 'Amendoim Torrado',
    price: 1.2,
    type: 'food',
  },
  {
    name: 'Coca Cola Limão',
    price: 1.2,
    type: 'drink',
  },
  {
    name: 'Pastel de Forno sabor Carne',
    price: 1.2,
    type: 'food',
  },
  {
    name: 'Pastel de Forno sabor Frango',
    price: 1.2,
    type: 'food',
  },
];

export const HomeScreen = ({navigation}: ScreenProps): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const [productItems, setProductItems] = useState<ProductItemType[]>([]);

  const {setProducts, getProducts} = useStorage();
  const {toastInfo} = useToastApp();

  const handleUpdateProducts = async () => {
    setProducts(productsApi);
    setProductItems(
      getProducts().map(product => ({
        ...product,
        quantity: 0,
      })),
    );
  };

  const handleSetProducts = (index: number, number: number) => {
    const tempProducts = [...productItems];
    tempProducts[index].quantity = number;
    setProducts(tempProducts);
  };

  const handleShowDetailsModal = () => {
    if (productItems.some(p => p.quantity > 0)) {
      setShowDetails(true);
    } else {
      toastInfo('Nenhum produto selecionado');
    }
  };

  return (
    <Container>
      <TopBar
        name="Ordem"
        leftIconName="autorenew"
        rightIconName="account-circle"
        onClickLeftIcon={handleUpdateProducts}
        onClickRightIcon={() => navigation?.navigate(NavigationType.PROFILE)}
      />
      <ProductList
        data={productItems}
        ItemSeparatorComponent={ProductSeparator}
        renderItem={it => {
          return (
            <Product
              key={it.index}
              name={it.item.name}
              price={it.item.price}
              quantity={it.item.quantity}
              type={it.item.type}
              setQuantity={value => {
                handleSetProducts(it.index, value);
              }}
            />
          );
        }}
      />
      <HomeCheckoutButton name="Detalhes" onPress={handleShowDetailsModal} />
      <DetailsModal
        products={productItems.filter(p => p.quantity > 0)}
        closeModal={() => setShowDetails(false)}
        showModal={showDetails}
        navigation={navigation}
      />
    </Container>
  );
};
