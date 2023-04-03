import express from 'express'
import axios from 'axios'
import { Octokit } from 'octokit'

const router = express.Router()

const clientID = "c797c8f6337a43df4d6e"
const clientSecret = "ce7b477e7b518974f872c9cbf08f5bdef9625188"
var accessToken = ""

router.get('/oauth/redirect', (req, res) => {
  GitHubLogin(req.query.code);
  res.redirect("http://localhost:3000/");
});

router.get('/octokit/getIssue', async (_, res) => {
  const result = await getIssue(accessToken);
  res.json({ issues: result })
});

const GitHubLogin = async (code) => {
  const requestToken = code;
  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });
  accessToken =  tokenResponse.data.access_token;
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  const name = result.data.name;
  //console.log(result);
  console.log(result.data.name);
}


const getIssue = async (accessToken) => {
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/issues`,
    headers: {
      accept: 'application/vnd.github.v3+json',
      Authorization: `token ${accessToken}`
    }
  });

  return result.data

  /*
  console.log(accessToken);
  const octokit = new Octokit({
    auth: accessToken
  });
  */

  /*
  const result = await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: 'nolonger891204',
    repo: 'Dcard-2023-Frontend-Intern-Homework',
    title: 'Found a bug',
    body: 'I\'m having a problem with this.',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  console.log(result)
  */

  /*
  const result = await octokit.request('GET /user/issues', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      'accept': 'application/vnd.github+json'
    }
  });
  console.log(result);
  */
}

const createIssue = async () => {
  /*
  const result = await axios({
    method: 'post',
    url: `https://api.github.com/repos/nolonger891204/Dcard-2023-Frontend-Intern-Homework/issues`,
    data: {
      title: 'Found a bug',
      body: 'I\'m having a problem with this.',
      assignees: [
        'octocat'
      ],
      milestone: 1,
      labels: [
        'bug'
      ],
    },
    headers: {
      accept: 'application/vnd.github.v3+json',
      Authorization: `token ${accessToken}`
    }
  });
  console.log(result);
*/
}

export default router;