import axios, { AxiosInstance } from 'axios';
import { TOKEN } from './constant';

const token = localStorage.getItem(TOKEN);

const Axios: AxiosInstance = axios.create({
  baseURL: 'http://192.249.18.120',
  headers: {
    authorization: token,
  },
});

export default Axios;
