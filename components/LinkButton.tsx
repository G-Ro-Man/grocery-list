import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
}

export default function LinkButton(
  { title, onPress }: LinkButtonProps
): React.JSX.Element {
  return (
    <Button
      size='md'
      variant='link'
      action='secondary'
      onPress={onPress}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  )
}