import Axios from '../defaultClient';
import {
  CoreOutput,
  FetchAllMeetingLogOutput,
  LoginUserInput,
  LoginUserOutput,
} from './types';

export const fetchAllMeetingLogAPI = async () => {
  return Axios.get<FetchAllMeetingLogOutput>('/log/getAll');
};

// export const loginUserAPI = async (loginUserInput: LoginUserInput) => {
//   return Axios.post<LoginUserOutput>('/user/login', {
//     ...loginUserInput,
//   });
// };
