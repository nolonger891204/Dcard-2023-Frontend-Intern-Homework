import express from 'express'
import axios from 'axios'
import { Octokit } from 'octokit'
import { getIssue } from './getIssue'
import { queryIssue } from './queryIssue'
import { updateIssue } from './updateIssue'

const router = express.Router()

const clientID = "c797c8f6337a43df4d6e"
const clientSecret = "ce7b477e7b518974f872c9cbf08f5bdef9625188"
var username = ""
var accessToken = ""

router.get('/oauth/redirect', async (req, res) => {
  username = await GitHubLogin(req.query.code);
  res.redirect("http://localhost:3000/login%3Dtrue");
});

router.get('/octokit/getIssue', async (req, res) => {
  const page = req.query.page;
  const labels = req.query.labels;
  try {
    const result = await getIssue(accessToken, page, labels);
    res.json({ issues: result });
  } catch (e) {
    console.log(e.message);
  }
});

router.get('/search/issues', async (req, res) => {
  const q = req.query.q;
  try {
    const result = await queryIssue(accessToken, q);
    res.json({ issues: result });
  } catch (e) {
    console.log(e.message);
  }
});

router.get('/update/issues', async (req, res) => {
  const username = req.query.username;
  const repo = req.query.repo;
  const issue_number = req.query.issue_number;
  const data = req.query.data;
  
  try {
    await updateIssue(accessToken, username, repo, issue_number, data);
    // res.json({ issues: result });
  } catch (e) {
    console.log(e.message);
  }
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
  return name
}

export default router;