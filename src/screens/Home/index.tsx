import React, {useState} from 'react';
import {
  Container,
  HomeCheckoutButton,
  ProductList,
  ProductSeparator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {Product} from '@components/Product';
import {ProductType, ScreenProps} from '@src/types';
import {DetailsModal} from '@components/Modals/DetailsModal';
import {ToastAndroid} from 'react-native';

const productsApi: ProductType[] = [
  {
    name: 'Salmão',
    id: '1',
    price: 1.15,
    quantity: 0,
  },
  {
    name: 'Sushi',
    id: '2',
    price: 4.75,
    quantity: 0,
  },
  {
    name: 'Pedra',
    id: '3',
    price: 8,
    quantity: 0,
  },
  {
    name: 'Papel',
    id: '4',
    price: 2,
    quantity: 0,
  },
];

export const HomeScreen = ({navigation}: ScreenProps): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const [products, setProducts] = useState<ProductType[]>(
    productsApi.map(p => ({
      ...p,
      quantity: 0,
    })),
  );

  const handleSetProducts = (index: number, number: number) => {
    const tempProducts = [...products];
    tempProducts[index].quantity = number;
    setProducts(tempProducts);
  };

  const handleShowDetailsModal = () => {
    if (products.some(p => p.quantity > 0)) {
      setShowDetails(true);
    } else {
      ToastAndroid.showWithGravity(
        'Nenhum produto selecionado',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <Container>
      <TopBar
        name="Ordem"
        leftIconName="chevron-left"
        rightIconName="account-circle"
      />
      <ProductList
        data={products}
        ItemSeparatorComponent={ProductSeparator}
        renderItem={it => {
          return (
            <Product
              key={it.index}
              name={it.item.name}
              price={it.item.price}
              quantity={it.item.quantity}
              setQuantity={value => {
                handleSetProducts(it.index, value);
              }}
            />
          );
        }}
      />
      <HomeCheckoutButton name="Detalhes" onPress={handleShowDetailsModal} />
      <DetailsModal
        products={products.filter(p => p.quantity > 0)}
        closeModal={() => setShowDetails(false)}
        showModal={showDetails}
        navigation={navigation}
      />
    </Container>
  );
};
