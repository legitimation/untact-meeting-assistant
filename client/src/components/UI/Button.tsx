import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  type: string;
  onClick: () => void;
}

export default function Button({ children, type, onClick }: Props) {
  return (
    <SButton className={type} onClick={onClick}>
      {children}
    </SButton>
  );
}

const SButton = styled.button`
  text-align: center;
  min-width: 150px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  width: 20px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  margin: 20px 10px;
  padding: 10px;
  &.mic {
    background-color: #333;
    color: #fff;
  }
  &.remove {
    background-color: salmon;
    color: #fff;
  }
  &.chat {
    background-color: #3f51b5;
    color: #fff;
  }
`;
