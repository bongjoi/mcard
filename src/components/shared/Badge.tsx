import styled from '@emotion/styled';

import { colors } from '@styles/colorPalette';
import Text from './Text';

interface BadgeProps {
  label: string;
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`;

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text bold={true} typography="t7" color="white">
        {label}
      </Text>
    </Container>
  );
}

export default Badge;
