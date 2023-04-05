import axios from 'axios'

const queryIssue = async (accessToken, q) => {
    const result = await axios({
        method: 'get',
        url: `https://api.github.com/search/issues`,
        params: {
        q: q,
        },
        headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
        }
    });
    return result.data
}

export { queryIssue }