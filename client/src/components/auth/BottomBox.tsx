import styled from 'styled-components';
import { BaseBox } from '../shared';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  toggleAuthTypeHandler: () => void;
}

export default function BottomBox({
  title,
  description,
  toggleAuthTypeHandler,
}: Props) {
  return (
    <SBottomBox>
      <span>{description}</span>
      <span className="title" onClick={toggleAuthTypeHandler}>
        {title}
      </span>
    </SBottomBox>
  );
}

const SBottomBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  span {
    margin-right: 5px;
  }
  a {
    font-weight: 600;
  }
  .title {
    font-weight: bold;
    color: rgb(63, 81, 181);
    cursor: pointer;
  }
  .title:hover {
    text-decoration: underline;
  }
`;
