import styled from 'styled-components';
import Notifications from '../components/webcam/Notifications';
import Options from '../components/webcam/Options';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Draggable from 'react-draggable';
import PageLayout from '../components/PageLayout';
import { useState } from 'react';
import flowers from './background6.jpg';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function WaitingRoom({ useAuthInput }: Props) {
  const [faceContainerWidth, setFaceContainerWidth] = useState('default');

  const sizeUp = () => {
    if (faceContainerWidth === 'default') {
      setFaceContainerWidth('up');
    } else {
      setFaceContainerWidth('default');
    }
  };

  const sizeDown = () => {
    if (faceContainerWidth === 'default') {
      setFaceContainerWidth('down');
    } else {
      setFaceContainerWidth('default');
    }
  };

  return (
    <div  style={{ 
      backgroundImage: `url(${flowers})` 
      }}>
    <PageLayout title={'Waiting room'} useAuthInput={useAuthInput}>

      <Draggable>
        <Container>
          <FaceContainer faceContainerWidth={faceContainerWidth}>
            <VideoPlayer
              widthController={[faceContainerWidth, sizeUp, sizeDown]}
            />
            {useAuthInput[0] ? (
              <Options>
                <Notifications />
              </Options>
            ) : (
              <LoginIndicator>Join Our Meeting Assistant!</LoginIndicator>
            )}
          </FaceContainer>
        </Container>
      </Draggable>
      </PageLayout>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: perfume;
`;

const FaceContainer = styled.div<{ faceContainerWidth: string }>`
  margin-top: 30px;
  width: ${(props) => {
    if (window.location.pathname === '/') {
      return props.faceContainerWidth === 'default'
        ? '500px'
        : props.faceContainerWidth === 'up'
        ? '800px'
        : '300px';
    } else if (window.location.pathname === '/meeting-room') {
      return props.faceContainerWidth === 'default'
        ? '300px'
        : props.faceContainerWidth === 'up'
        ? '400px'
        : '0px';
    }
  }};
  cursor: pointer;
`;

const LoginIndicator = styled.div`
  border: 2px solid black;
  margin-top: 10px;
  width: 500px;
  padding: 30px 0;
  font-size: 24px;
  text-align: center;
`;
