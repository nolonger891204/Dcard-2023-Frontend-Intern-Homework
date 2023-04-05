import axios from 'axios'

const updateIssue = async (accessToken, username, repo, issue_number, data) => {
    const result = await axios({
      method: 'post',
      url: `https://api.github.com/repos/${username}/${repo}/issues/${issue_number}`,
      data: data,
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });
  
    console.log(result);
}

export { updateIssue }
  