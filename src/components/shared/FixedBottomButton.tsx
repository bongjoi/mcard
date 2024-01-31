import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

import { colors } from '@styles/colorPalette';

import Button from './Button';

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`;

const buttonStyles = css`
  border-radius: 8px;
`;

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function FixedBottomButton({
  label,
  onClick,
  disabled
}: FixedBottomButtonProps) {
  const $portal_root = document.getElementById('root-portal');

  if ($portal_root === null) {
    return null;
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        full={true}
        onClick={onClick}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>,
    $portal_root
  );
}

export default FixedBottomButton;
