import axios from 'axios'

const getIssue = async (accessToken, page, labels) => {
    const result = await axios({
      method: 'get',
      url: `https://api.github.com/issues`,
      params: {
        per_page: 10,
        page: page,
        labels: labels
      },
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });
  
    return result.data
}
  
export { getIssue }