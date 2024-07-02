import { Button, ButtonText } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
}

export default function LinkButton(
  { title, onPress }: LinkButtonProps
): ReactNode {
  return (
    <Button
      size="md"
      variant="link"
      action="secondary"
      onPress={onPress}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  )
}