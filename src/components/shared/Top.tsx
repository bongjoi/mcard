import { css } from '@emotion/react';

import Flex from './Flex';
import Text from './Text';

const containerStyles = css`
  padding: 24px;
`;

interface TopProps {
  title: string;
  subTitle: string;
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}

export default Top;
