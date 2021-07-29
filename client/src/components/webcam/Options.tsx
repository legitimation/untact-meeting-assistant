import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../../providers/SocketProvider';

interface Props {
  children: React.ReactNode;
}

const Options = ({ children }: Props) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container>
      <div>
        <div>
          <div>
            <TextField
              label="Type User Name"
              value={name}
              onChange={(e) => setName!(e.target.value!)}
              fullWidth
            />

            <CopyToClipboard text={me!}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}
              >
                Copy room id
              </Button>
            </CopyToClipboard>
          </div>

          <div>
            <TextField
              label="Room ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
            />

            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
              >
                Hang Up
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="small" />}
                fullWidth
                onClick={() => callUser!(idToCall)}
              >
                Call
              </Button>
            )}
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px;
  border: 3px solid black;
  margin-top: 5px;
`;

export default Options;
