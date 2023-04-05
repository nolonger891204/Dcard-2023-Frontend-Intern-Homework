import axios from 'axios'

const updateIssue = async (accessToken, issueUrl, data) => {
    const result = await axios({
      method: 'post',
      url: `${issueUrl}`,
      data: data,
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });
  
    return result.status;
}

export { updateIssue }
  