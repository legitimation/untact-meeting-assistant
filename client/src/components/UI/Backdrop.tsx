import styled from 'styled-components';
import { PortalConsumer } from '../../providers/PortalProvider';

interface Props {
  children: React.ReactNode;
  isClose: boolean;
  toggleCloseHandler: () => void;
}

export default function Backdrop({
  children,
  isClose,
  toggleCloseHandler,
}: Props) {
  const clickHandler = () => {
    toggleCloseHandler();
  };

  return (
    <PortalConsumer>
      <BackdropContainer close={isClose} onClick={() => clickHandler()}>
        {children}
      </BackdropContainer>
    </PortalConsumer>
  );
}

const BackdropContainer = styled.div<{ close: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(249, 249, 249, 0.95);
  opacity: ${(props) => (props.close ? 0 : 1)};
  transition: ${(props) => !props.close && 'opacity 0.3s'};
  z-index: ${(props) => (props.close ? -999 : 999)};
`;
