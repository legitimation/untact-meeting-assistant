import { useCallback, useEffect, useState, createRef } from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/diagram/Diagram';
import Header from '../components/UI/Header';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import PageTitle from '../components/PageTitle';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Options from '../components/webcam/Options';
import Notifications from '../components/webcam/Notifications';
import PageLayout from '../components/PageLayout';
import Draggable from 'react-draggable';
import Modal from '../components/UI/Modal';
import { ChatContainer, ChatMainBox } from '../components/chat/ChatContainer';
import {
  ChatControlBox,
  ChatController,
} from '../components/chat/ChatController';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function MeetingRoom({ useAuthInput }: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [faceContainerWidth, setFaceContainerWidth] = useState('default');

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser doesn't support speech recognition.");
    }
  }, []);

  useEffect(() => {
    const newTranscriptArr = transcript.split(' ');
    setTranscriptArr(newTranscriptArr);
    console.log('newTranscriptArr', newTranscriptArr);
  }, [transcript]);

  const toggleListening = useCallback(() => {
    if (recording) {
      SpeechRecognition.stopListening();
      setRecording(false);
    } else {
      SpeechRecognition.startListening({
        language: 'ko-KR',
        continuous: true,
      });
      setRecording(true);
    }
  }, [recording]);

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

  const chatClickHandler = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <PageLayout title="Room" useAuthInput={useAuthInput}>
      <Container>
        <DiagramContainer>
          <Diagram transcriptArr={transcriptArr} />

          <ControlBox>
            <Button type="mic" onClick={toggleListening}>
              {' '}
              STT Start
              <RecordingIndicator recording={recording} />
            </Button>
            <Button type="remove" onClick={resetTranscript}>
              {' '}
              Reset
            </Button>
            <Button type="chat" onClick={chatClickHandler}>
              {' '}
              Chatting
            </Button>
          </ControlBox>
        </DiagramContainer>

        <Draggable>
          <FaceContainer faceContainerWidth={faceContainerWidth}>
            <VideoPlayer
              widthController={[faceContainerWidth, sizeUp, sizeDown]}
            />
            {faceContainerWidth !== 'down' ? (
              <Options>
                <Notifications />
              </Options>
            ) : null}
          </FaceContainer>
        </Draggable>

        {showChatBox && (
          <Modal>
            <Draggable>
              <ChatContainer>
                <ChatControlBox>
                  <ChatController
                    onClick={() => setShowChatBox(false)}
                    className="close"
                  >
                    x
                  </ChatController>
                </ChatControlBox>
                <ChatMainBox>채팅이 여기옵니다.</ChatMainBox>
              </ChatContainer>
            </Draggable>
          </Modal>
        )}
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #FFFFFF;
`;

const DiagramContainer = styled.div`
  width: 100%;
`;

const ControlBox = styled.div``;

export const FaceContainer = styled.div<{ faceContainerWidth: string }>`
  position: absolute;
  right: 30px;
  z-index: 888;
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
`;

const RecordingIndicator = styled.span<{ recording: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.recording ? 'red' : '#ccc')};
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: 9px;
`;
