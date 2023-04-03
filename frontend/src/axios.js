import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

const getIssue = async () => {
  const { data: { issues } } = await instance.get('/octokit/getIssue');
  console.log(issues);
};

export { getIssue };