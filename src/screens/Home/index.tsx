import React, {useState} from 'react';
import {
  Container,
  HomeCheckoutButton,
  ProductList,
  ProductSeparator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {Product} from '@components/Product';
import {ProductItemType, ScreenProps} from '@src/types';
import {DetailsModal} from '@components/Modals/DetailsModal';
import {useToastApp} from '@hooks/toast-app';
import {useStorage} from '@hooks/storage';

const productsApi = [
  {
    name: 'Salmão',
    price: 1.15,
  },
  {
    name: 'Sushi',
    price: 4.75,
  },
  {
    name: 'Pedra',
    price: 8,
    quantity: 0,
  },
  {
    name: 'Papel',
    price: 2,
  },
];

export const HomeScreen = ({navigation}: ScreenProps): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const {setProducts, getProducts} = useStorage();
  const [productItems, setProductItems] = useState<ProductItemType[]>([]);
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
