import { VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

export default function ScreenWrapper({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <VStack
      paddingBottom='$20'
      alignItems='center'
      justifyContent='center'
      flex={1}
      height='$full'
      bg='$trueGray100'
      $dark-bg='$trueGray800'
    >
      {children}
    </VStack>
  )
}