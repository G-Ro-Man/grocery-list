import { FlatList, HStack } from '@gluestack-ui/themed';
import GroceryListItem from '@/components/GroceryListItem';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import $api from '@/api';
import MainButton from '@/components/MainButton';
import EmptyListComponent from '@/components/EmptyListComponent';
import ScreenWrapper from '@/components/ScreenWrapper';

const renderItem = ({ item }: any) =>  <GroceryListItem item={item} />
const keyExtractor= (item: any) => item.id

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const [posts, setPosts] = useState([])

  const onPress = useCallback(async () => {
    navigate('modal');
  },[navigate])

  useEffect(()=>{
    $api.get('/posts').then(({ data }) => {
      setPosts(data);
    })
  },[])

  return (
    <ScreenWrapper>
      <FlatList
        paddingHorizontal='$5'
        overflow='visible'
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyListComponent}
      />
      <HStack width='$full' position='absolute' bottom='$2.5' justifyContent='center'>
        <MainButton title='Add Product' onPress={onPress} />
      </HStack>
    </ScreenWrapper>
  );
}
