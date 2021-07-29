import styled from 'styled-components';

export const ChatControlBox = styled.div`
  width: 100%;
  height: 23px;
  padding: 5px 10px;
  background-color: #555;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ChatController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  &.close {
    background-color: red;
    color: #fff;
  }
`;
