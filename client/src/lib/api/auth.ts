import Axios from '../defaultClient';
import {
  CoreOutput,
  CreateUserInput,
  LoginUserInput,
  LoginUserOutput,
} from './types';

export const createUserAPI = async (createUserInput: CreateUserInput) => {
  return Axios.post<CoreOutput>('/user/join', {
    ...createUserInput,
  });
};

export const loginUserAPI = async (loginUserInput: LoginUserInput) => {
  return Axios.post<LoginUserOutput>('/user/login', {
    ...loginUserInput,
  });
};
