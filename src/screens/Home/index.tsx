import React, {useEffect, useState} from 'react';
import {
  Container,
  HomeCheckoutButton,
  ProductInfoArea,
  ProductInfoText,
  ProductList,
  ProductSeparator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {Product} from '@components/Product';
import {NavigationType, ProductItemType, ScreenProps} from '@src/types';
import {DetailsModal} from '@components/Modals/DetailsModal';
import {useToastApp} from '@hooks/toast-app';
import {useStorage} from '@hooks/storage';
import {useApi} from '@src/hooks/api';
import {LoadingModal} from '@components/Modals/LoadingModal';

export const HomeScreen = ({navigation, route}: ScreenProps): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const [productItems, setProductItems] = useState<ProductItemType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const {setProducts, getProducts} = useStorage();
  const {listProducts} = useApi();
  const {toastInfo, toastError} = useToastApp();

  useEffect(() => {
    const newProducts = getProducts();
    if (newProducts.length === 0) {
      toastInfo('Nenhum produto cadastrado no app');
    } else {
      setProductItems(
        newProducts.map(prod => ({
          ...prod,
          quantity: 0,
        })),
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (route?.params?.goBack === NavigationType.CHECKOUT) {
      setProductItems(
        productItems.map(prod => ({
          ...prod,
          quantity: 0,
        })),
      );
    }
    // eslint-disable-next-line
  }, [route?.params?.goBack]);

  const handleUpdateProducts = async () => {
    setIsFetching(true);
    try {
      const {products: fetchProducts} = await listProducts();
      if (fetchProducts.length === 0) {
        toastInfo('Não há produtos cadastrados no sistema');
      } else {
        toastInfo('Produtos carregados com sucesso');
        setProducts(fetchProducts);
        setProductItems(
          fetchProducts.map(product => ({
            ...product,
            quantity: 0,
          })),
        );
      }
    } catch (err) {
      console.error(err);
      toastError('Erro ao buscar produtos, por favor, tente novamente');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSetProducts = (index: number, number: number) => {
    const tempProducts = [...productItems];
    tempProducts[index].quantity = number;
    setProductItems(tempProducts);
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
      {isFetching && <LoadingModal isLoading={isFetching} />}
      <TopBar
        name="Ordem"
        leftIconName="autorenew"
        rightIconName="account-circle"
        onClickLeftIcon={handleUpdateProducts}
        onClickRightIcon={() => navigation?.navigate(NavigationType.PROFILE)}
      />
      {productItems.length === 0 ? (
        <>
          <ProductInfoArea>
            <ProductInfoText>
              Não há produtos registrados no app... clique no botão superior
              esquerdo para buscar os produtos no sistema
            </ProductInfoText>
          </ProductInfoArea>
        </>
      ) : (
        <>
          <ProductList
            data={productItems}
            ItemSeparatorComponent={ProductSeparator}
            renderItem={it => {
              return (
                <Product
                  key={it.index}
                  name={it.item.name}
                  price={it.item.price}
                  oldPrice={it.item.oldPrice}
                  quantity={it.item.quantity}
                  type={it.item.type}
                  setQuantity={value => {
                    handleSetProducts(it.index, value);
                  }}
                />
              );
            }}
          />
          <HomeCheckoutButton
            name="Detalhes"
            onPress={handleShowDetailsModal}
          />
        </>
      )}
      <DetailsModal
        products={productItems.filter(p => p.quantity > 0)}
        closeModal={() => setShowDetails(false)}
        showModal={showDetails}
        navigation={navigation}
      />
    </Container>
  );
};
