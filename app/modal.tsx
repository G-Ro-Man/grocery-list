import { View, Platform } from 'react-native';
import { Link, router, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AddIcon,
  Button,
  ButtonText,
  Input,
  InputField,
  KeyboardAvoidingView,
  VStack
} from '@gluestack-ui/themed';
import { useCallback, useState } from 'react';
import { toKeyAlias } from '@babel/types';
import $api from '@/api';
import MainButton from '@/components/MainButton';
import LinkButton from '@/components/LinkButton';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function Modal() {
  const [product, onChangeProduct] = useState('');
  const { canGoBack, goBack } = useNavigation();

  const closeModal = useCallback(()=> {
    canGoBack() && goBack()
  },[canGoBack, goBack])

  const addProduct = useCallback( () => {
    $api.post('/posts', {
      title: product,
      "quantity": 1
    })
    closeModal()
  },[product, closeModal])


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={{ flex: 1, zIndex: 999 }}
    >
      <ScreenWrapper>
        <Input variant="outline" size="xl" width='80%'>
          <InputField placeholder="Enter product" onChangeText={onChangeProduct} value={product} />
        </Input>
        <MainButton title='Add Product' onPress={addProduct} />
        <LinkButton title='Go back' onPress={closeModal} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}