import styled from 'styled-components';
import { PortalConsumer } from '../../providers/PortalProvider';

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  return (
    <PortalConsumer>
      <ModalContainer>
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContainer>
    </PortalConsumer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: 300px;
  height: 400px;
`;
