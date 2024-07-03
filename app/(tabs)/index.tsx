import React, { useCallback } from 'react';
import { FlatList, HStack } from '@gluestack-ui/themed';
import GroceryListItem from '@/components/GroceryListItem';
import { useNavigation } from 'expo-router';
import MainButton from '@/components/MainButton';
import EmptyListComponent from '@/components/EmptyListComponent';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { getAllProducts, GROCERY_LIST_KEY } from '@/api/products';

const renderItem = ({ item }: any) =>  <GroceryListItem item={item} />
const keyExtractor= (item: any) => item.id

export default function HomeScreen(): React.JSX.Element {
  const { navigate } = useNavigation();

  const openModal = useCallback(async () => {
    navigate('modal');
  },[navigate])

  const { isPending, data } = useQuery({
    queryKey: [GROCERY_LIST_KEY],
    queryFn: getAllProducts,
  })

  if (isPending) return <Loader />

  return (
    <ScreenWrapper>
      <FlatList
        width='$full'
        paddingHorizontal='$5'
        overflow='visible'
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyListComponent}
      />
      <HStack width='$full' position='absolute' bottom='$2.5' justifyContent='center'>
        <MainButton title='Add Product' onPress={openModal} />
      </HStack>
    </ScreenWrapper>
  );
}
