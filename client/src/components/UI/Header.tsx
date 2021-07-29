import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Backdrop from './Backdrop';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';

interface Props {
  useAuthInput: [boolean, (token?: string | undefined) => void];
}

export default function Header({ useAuthInput }: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authPageType, setAuthPageType] = useState('login');

  const toggleCloseHandler = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleAuthTypeHandler = () => {
    if (authPageType === 'login') {
      setAuthPageType('signup');
    } else if (authPageType === 'signup') {
      setAuthPageType('login');
    }
  };

  return (
    <SHeader>
      <Navigation>
        <Link to={routes.root}>
          <Title> Untact Meeting Helper </Title>
        </Link>
        {useAuthInput[0] ? (
          <div>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faHouseUser} size="2x"/>
            </Link>
            <Link to={routes.meetingRoom}>
              <FontAwesomeIcon icon={faHandshake} size="2x"/>
            </Link>
            <SButton onClick={() => useAuthInput[1]()}>Log out</SButton>
          </div>
        ) : (
          <div>
            <a>
              <FontAwesomeIcon
                onClick={() => setShowLoginModal(true)}
                icon={faHouseUser}
              />
            </a>
            <a>
              <FontAwesomeIcon
                onClick={() => setShowLoginModal(true)}
                icon={faHandshake}
              />
            </a>
          </div>
        )}

        <Backdrop
          isClose={!showLoginModal}
          toggleCloseHandler={toggleCloseHandler}
        >
          {authPageType === 'login' ? (
            <Login
              toggleAuthTypeHandler={toggleAuthTypeHandler}
              useAuthInput={useAuthInput}
            />
          ) : (
            <SignUp toggleAuthTypeHandler={toggleAuthTypeHandler} />
          )}
        </Backdrop>
      </Navigation>
    </SHeader>
  );
}

const SHeader = styled.header`
  display: flex;
  padding: 10px 0;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  border-left: 3px solid black;
  border-right: 3px solid black;
  background-color: aliceblue;
`;

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0 20px;
    color: blurry;
  }
  a {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: black;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  font-size: 32px;
  text-align: justify;
  padding: 0.25em 1em;
  font-weight: bold;
  font-family: Times, cursive;
`;

const SButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  padding: 10px;
  border: 10;
  height: 100%;
  cursor: pointer;
`;
