import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

const githubLogin = async () => {
  const { data: { msg } } = await instance.post('/start')
  return msg
};

export { githubLogin };