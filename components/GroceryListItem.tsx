import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
  HStack,
  Text,
  AddIcon,
  RemoveIcon,
} from '@gluestack-ui/themed';
import { ReactNode, useCallback, useState } from 'react';
import $api from '@/api';
import SmallButton from '@/components/SmallButton';

export default function GroceryListItem({ item }: any): ReactNode {
  const [isDone, setIsDone] = useState(false);

  const increment = useCallback(()=>{
    $api.patch(`/posts/${item.id}`, {
      ...item,
      "quantity": item.quantity + 1
    })
  },[item])

  const decrement = useCallback(()=> {
    if (item.quantity <= 1) {
      $api.delete(`/posts/${item.id}`)
    } else {
      $api.patch(`/posts/${item.id}`, {
        ...item,
        "quantity": item.quantity - 1
      })
    }
  },[item])

  return (
      <HStack
        space='md'
        justifyContent='space-between'
        borderBottomWidth='$1'
        borderColor='$trueGray800'
        $dark-borderColor='$trueGray100'
        $base-py='$4'
        $base-px='$5'
        rounded='$lg'
        margin={4}
      >
        <Checkbox isChecked={isDone} onChange={setIsDone} aria-label='checkbox' value={item.key}>
          <CheckboxIndicator mr='$2'>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </Checkbox>
        <Text
          color='$coolGray800'
          $dark-color='$warmGray100'
          strikeThrough={isDone}
          width='$full'
          flexShrink={1}
        >
          {item.title}
        </Text>
        <HStack space='md' justifyContent='space-between' alignItems='center'>
          <SmallButton icon={RemoveIcon} onPress={decrement} />
          <Text fontSize='$md' color='$coolGray800' $dark-color='$warmGray100'>
            {item.quantity}
          </Text>
          <SmallButton icon={AddIcon} onPress={increment} />
        </HStack>
      </HStack>
  );
};
