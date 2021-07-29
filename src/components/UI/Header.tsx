import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';

interface Props {
  label: string;
}

export default function Header({ label }: Props) {
  return (
    <SHeader>
      <h1>{label}</h1>
      <Navigation>
        <Link to={routes.home}>Home</Link>
        <Link to={routes.meetingRoom}>Meeting room</Link>
        <Link to="webcam">Web cam</Link>
      </Navigation>
    </SHeader>
  );
}

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  flex: 0.7;
  align-items: center;
  justify-content: center;
  a {
    color: #fff;
    margin: 10px 20px;
  }
`;
