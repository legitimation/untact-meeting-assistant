import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { routes } from '../routes/index';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginUserAPI } from '../lib/api/auth';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import FormError from '../components/auth/FormError';
import BottomBox from '../components/auth/BottomBox';
import { SFormError } from '../components/auth/FormError';

interface LoginFormField {
  email: string;
  password: string;
  result: string;
}

interface LocationState {
  email: string;
  password: string;
  message: string;
}

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
  toggleAuthTypeHandler: () => void;
}

export default function Login({ useAuthInput, toggleAuthTypeHandler }: Props) {
  const location = useLocation<LocationState>();
  const [reqErrorMessage, setReqErrorMessage] = useState<string>('');
  const { mutateAsync, isLoading } = useMutation(loginUserAPI);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      email: location?.state?.email || '',
      password: location?.state?.password || '',
    },
  });

  const onSubmitValid = async (data: LoginFormField) => {
    if (isLoading) return null;
    const { email, password } = data;
    try {
      const res = await mutateAsync({
        email,
        password,
      });
      if (res.data.ok) {
        useAuthInput[1](res.data.userId);
        window.location.href = '/home';
      } else {
        setReqErrorMessage(res.data.error!);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Container
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <PageTitle title="Login" />
      <FormBox>
        <Title>Meeting Assistant</Title>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('email', {
              required: {
                value: true,
                message: '???????????? ???????????????.',
              },
            })}
            type="text"
            placeholder="?????????"
            hasError={Boolean(errors?.email)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '??????????????? ???????????????.',
              },
              minLength: {
                value: 5,
                message: '??????????????? 5?????? ???????????? ??????????????????.',
              },
            })}
            type="password"
            placeholder="????????????"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            disabled={!isValid && !Boolean(errors.result?.message)}
            type="submit"
          >
            {isLoading ? '????????? ??? ...' : '?????????'}
          </Button>
        </form>
        <ErrorMessage>{reqErrorMessage}</ErrorMessage>
      </FormBox>

      <BottomBox
        title="????????????"
        description="????????? ????????????????"
        toggleAuthTypeHandler={toggleAuthTypeHandler}
      />
    </Container>
  );
}

const Container = styled.div``;
const Notification = styled.div`
  color: #2ecc71;
`;

export const ErrorMessage = styled(SFormError)`
  font-size: 15px;
  margin: 0px 0px 20px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.color};
`;
