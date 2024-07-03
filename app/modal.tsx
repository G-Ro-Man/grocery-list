import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Input, InputField, KeyboardAvoidingView } from '@gluestack-ui/themed';
import MainButton from '@/components/MainButton';
import LinkButton from '@/components/LinkButton';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, GROCERY_LIST_KEY } from '@/api/products';
import Loader from '@/components/Loader';

export default function Modal(): React.JSX.Element {
  const [product, onChangeProduct] = useState('');
  const { canGoBack, goBack } = useNavigation();
  const queryClient = useQueryClient()

  const closeModal = useCallback(()=> {
    canGoBack() && goBack()
  },[canGoBack, goBack])

  const onSuccess = useCallback( async () => {
    await queryClient.invalidateQueries({ queryKey: [GROCERY_LIST_KEY] })
    closeModal()
  },[closeModal,queryClient])

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess,
  })

  const addNewProduct = useCallback( () => {
    mutation.mutate(product);
  },[product, mutation])

  if (mutation.isPending) return <Loader />

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={{ flex: 1, zIndex: 999 }}
    >
      <ScreenWrapper>
        <Input variant='outline' size='xl' width='80%'>
          <InputField placeholder='Enter product' onChangeText={onChangeProduct} value={product} />
        </Input>
        <MainButton title='Add Product' onPress={addNewProduct} />
        <LinkButton title='Go back' onPress={closeModal} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}