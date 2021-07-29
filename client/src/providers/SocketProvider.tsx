import { createContext, RefObject } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { isReturnStatement } from 'typescript';

interface ContextType {
  call?: CallType;
  callAccepted?: boolean;
  myVideo?: RefObject<HTMLVideoElement>;
  userVideo?: RefObject<HTMLVideoElement>;
  stream?: MediaStream;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  callEnded?: boolean;
  me?: string;
  callUser?: (id: string) => void;
  leaveCall?: () => void;
  answerCall?: () => void;
}

const SocketContext = createContext<ContextType>({});

interface Props {
  children: React.ReactNode;
}

const SOCKET_URL = 'https://video-chat-app-legitimation.herokuapp.com/';

const socket = io(SOCKET_URL);

interface CallType {
  name?: string;
  to?: string;
  from?: string;
  isReceivingCall?: boolean;
  signal?: Peer.SignalData;
}

const SocketContextProvider = ({ children }: Props) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState('');
  const [call, setCall] = useState<CallType>({});
  const [me, setMe] = useState('');

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (!myVideo.current) return;
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (!userVideo.current) return;
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal!);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      if (!userVideo.current) return;
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
