import Flex from './Flex';
import Text from './Text';

interface TopProps {
  title: string;
  subTitle: string;
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column">
      <Text></Text>
      <Text></Text>
    </Flex>
  );
}

export default Top;
