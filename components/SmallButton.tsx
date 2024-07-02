import { ReactNode } from 'react';
import { Button, ButtonIcon} from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed/build/components/Icons'; // Assuming there's a types file

interface SmallButtonProps {
  icon: typeof Icon;
  onPress: () => void;
}

export default function SmallButton(
  { icon, onPress }: SmallButtonProps
): ReactNode {
  return (
    <Button
      size="sm"
      variant="link"
      action="secondary"
      onPress={onPress}
    >
      <ButtonIcon as={icon} />
    </Button>
  )
}