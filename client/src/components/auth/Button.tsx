import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SButton = styled.button<Props>`
  width: 100%;
  border: none;
  color: #fff;
  margin-top: 15px;
  background-color: rgb(63, 81, 181);
  padding: 8px 0;
  font-weight: 600;
  border-radius: 3px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: pointer;
  svg {
    margin-right: 10px;
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
`;

export default SButton;
