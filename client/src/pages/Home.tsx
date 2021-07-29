import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes/index';
import PageLayout from '../components/PageLayout';
import Pastrec from './Pastrecords'

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}


export default function Home({ useAuthInput }: Props) {
  return (
    <PageLayout title="home" useAuthInput={useAuthInput}>
      <HomeContainer>
        {/* home page입니다. */}
        <Pastrec />
      </HomeContainer>
    </PageLayout>
  );
}

const HomeContainer = styled.div`
  height: 100vh;
`;