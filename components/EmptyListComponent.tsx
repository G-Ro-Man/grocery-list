import { Box, Text } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

export default function EmptyListComponent(): ReactNode {
  return(
    <Box alignSelf='center' pt='$5'>
      <Text>Your list is empty</Text>
    </Box>
  )
}