import { useMutation } from 'react-query';
import PageTitle from '../components/PageTitle';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import BottomBox from '../components/auth/BottomBox';
import { routes } from '../routes';
import FormError from '../components/auth/FormError';
import { useForm } from 'react-hook-form';
import { Title } from './Login';
import { useHistory } from 'react-router-dom';
import { createUserAPI } from '../lib/api/auth';
import styled from 'styled-components';
import { useState } from 'react';

interface SignUpFormField {
  email: string;
  name: string;
  password: string;
}
interface Props {
  toggleAuthTypeHandler: () => void;
}
export default function SignUp({ toggleAuthTypeHandler }: Props) {
  const [signUpSuccess, setSignUpsuccess] = useState(false);
  const { mutateAsync, isLoading } = useMutation(createUserAPI);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormField>({
    mode: 'onChange',
  });

  const onSubmitValid = async (data: SignUpFormField) => {
    if (isLoading) return;
    const { email, name, password } = data;
    try {
      const res = await mutateAsync({
        email,
        name,
        password,
      });
      console.log(res);
      if (res.data.ok) {
        setSignUpsuccess(true);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const bubbleClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <Container onClick={bubbleClickHandler}>
      <PageTitle title="Sign up" />
      <FormBox>
        <Title>Meeting Helper</Title>
        <h2>언텍트 시대, 화상 회의 도우미</h2>
        {signUpSuccess && <Notification>로그인 성공!</Notification>}
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('email', {
              required: {
                value: true,
                message: '이메일은 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '이메일을 5자리 이상으로 설정해주세요.',
              },
            })}
            type="text"
            placeholder="이메일 주소"
            hasError={Boolean(errors?.email)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register('name', {
              required: {
                value: true,
                message: '성명은 필수입니다.',
              },
            })}
            type="text"
            placeholder="성명"
            hasError={Boolean(errors?.name)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호는 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '비밀번호를 5자리 이상으로 설정해주세요.',
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button disabled={!isValid} type="submit">
            가입
          </Button>
          {isLoading && <p>로딩중..</p>}
        </form>
      </FormBox>
      <BottomBox
        title="계정이 있으신가요?"
        description="로그인"
        toggleAuthTypeHandler={toggleAuthTypeHandler}
      />
    </Container>
  );
}

const Notification = styled.div`
  color: #2ecc71;
  font-weight: bold;
`;

const Container = styled.div``;
