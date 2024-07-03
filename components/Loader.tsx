import React from 'react';
import { Text } from '@gluestack-ui/themed';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function Loader(): React.JSX.Element {
  return (
    <ScreenWrapper>
      <Text fontSize='$md' color='$coolGray800' $dark-color='$warmGray100'>
        Loading...
      </Text>
    </ScreenWrapper>
  )
}