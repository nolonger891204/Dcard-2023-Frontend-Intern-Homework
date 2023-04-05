import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

const getUsername = async (page_cnt) => {
  const { data: { username } } = await axios.get('http://localhost:3000/login%3Dtrue');
  console.log(username)
};

const getIssue = async (page_cnt, labels) => {
  const { data: { issues } } = await instance.get('/octokit/getIssue', 
    { 
      params: 
      { 
        page: page_cnt, 
        labels: labels
      } 
    });
  // console.log(issues);
  return issues
};

const queryIssue = async (q_text) => {
  const { data: { issues } } = await instance.get('/search/issues', 
    { 
      params: 
      { 
        q: q_text
      } 
    });
  return issues
}

const updateIssue = async (username, repo, issue_number, data) => {
  await instance.get('/update/issues',
  {
    params:
    {
      username: username,
      repo: repo, 
      issue_number: issue_number, 
      data: data
    }
  })
}


export { getUsername, getIssue, queryIssue, updateIssue };