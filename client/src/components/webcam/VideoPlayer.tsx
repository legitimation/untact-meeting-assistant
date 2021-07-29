import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../providers/SocketProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  widthController: [string, () => void, () => void];
}

const VideoPlayer = ({ widthController }: Props) => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  return (
    <Container>
      {stream && (
        //   Our own video
        <VideoContainer>
          <VideoTitle>
            <Title>
            {name || window.location.pathname === '/'
              ? 'Waiting Room'
              : 'Invite Colleagues'}
            
            <SButton className="plus" onClick={widthController[1]}>
              <FontAwesomeIcon icon={faPlus} />
            </SButton>
            <SButton className="minus" onClick={widthController[2]}>
              <FontAwesomeIcon icon={faMinus} />
            </SButton>
            </Title>
          </VideoTitle>
          <SVideo
            videoWidthRatio={widthController[0]}
            playsInline
            muted
            ref={myVideo}
            autoPlay
          />
        </VideoContainer>
      )}
      {callAccepted && !callEnded && (
        // users video
        <VideoContainer>
          <VideoTitle>{call?.name || 'Name'}</VideoTitle>
          <SVideo
            videoWidthRatio={widthController[0]}
            playsInline
            ref={userVideo}
            autoPlay
          />
        </VideoContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const VideoTitle = styled.div`
  background-color: #fff;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  white-space: pre;
`;

const VideoContainer = styled.div`
  padding: 0px;
  border: 3px solid black;
`;

const SVideo = styled.video<{ videoWidthRatio: string }>`
  width: ${(props) => {
    if (window.location.pathname === '/') {
      return props.videoWidthRatio === 'default'
        ? '500px'
        : props.videoWidthRatio === 'up'
        ? '800px'
        : '300px';
    } else if (window.location.pathname === '/meeting-room') {
      return props.videoWidthRatio === 'default'
        ? '300px'
        : props.videoWidthRatio === 'up'
        ? '400px'
        : '0px';
    }
  }};
`;

const SButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: right;
  margin: 0 5px;
  cursor: pointer;
  &.minus {
    background-color: tomato;
  }
  &.plus {
    background-color: lightblue;
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 24px;
  /* padding: 0em 0em; */
  font-weight: bold;
  font-family: Times;
`;

export default VideoPlayer;
