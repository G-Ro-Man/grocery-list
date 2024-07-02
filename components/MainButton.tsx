import { Button, ButtonText } from '@gluestack-ui/themed';
import { ReactNode } from 'react';


interface MainButtonProps {
  title: string;
  onPress: () => void;
}


export default function MainButton(
  { title, onPress }: MainButtonProps
): ReactNode {
  return (
    <Button
      size="xl"
      variant="solid"
      onPress={onPress}
      width='80%'
      mt='$7'
      mb='$4'
      bg='$info700'
      $dark-bg='$info300'
    >
      <ButtonText color='$lightBlue300' $dark-color='$lightBlue700'>{title}</ButtonText>
    </Button>
  )
}