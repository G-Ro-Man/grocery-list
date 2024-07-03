import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
  HStack,
  Text,
  AddIcon,
  RemoveIcon, Box, Spinner
} from '@gluestack-ui/themed';
import React, { useCallback, useState } from 'react';
import SmallButton from '@/components/SmallButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeQty, GROCERY_LIST_KEY, ProductType, removeProduct } from '@/api/products';

export default function GroceryListItem({ item }: ProductType): React.JSX.Element {
  const [isDone, setIsDone] = useState(false);

  const queryClient = useQueryClient()
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: [GROCERY_LIST_KEY] })
  }

  const mutationQty = useMutation({
    mutationFn: changeQty,
    onSuccess,
  })

  const mutationRemove = useMutation({
    mutationFn: removeProduct,
    onSuccess,
  })


  const increase = useCallback(()=>{
    mutationQty.mutate({ item, shouldIncrease: true })
  },[item, mutationQty])

  const decrement = useCallback(()=> {
    if (item.quantity <= 1) {
      mutationRemove.mutate(item.id)
    } else {
      mutationQty.mutate({ item, shouldIncrease: false })
    }
  },[item, mutationQty, mutationRemove])

  return (
      <HStack
        space='md'
        justifyContent='space-between'
        alignItems='center'
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
        <HStack space='md' justifyContent='space-between' alignItems='center' width='$20' minHeight='$9'>
          {mutationQty.isPending || mutationRemove.isPending
            ? (
              <Box justifyContent='center' alignItems='center' width='$full'>
                <Spinner size='small' />
              </Box>
            )
            : (
              <>
                <SmallButton icon={RemoveIcon} onPress={decrement} />
                <Text fontSize='$md' color='$coolGray800' $dark-color='$warmGray100'>
                  {item.quantity}
                </Text>
                <SmallButton icon={AddIcon} onPress={increase} />
              </>
            )
          }
        </HStack>
      </HStack>
  );
};
