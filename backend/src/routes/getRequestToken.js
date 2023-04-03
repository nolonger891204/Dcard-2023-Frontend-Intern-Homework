import express from 'express'
import axios from 'axios'

const router = express.Router()

const clientID = "c797c8f6337a43df4d6e"
const clientSecret = "ce7b477e7b518974f872c9cbf08f5bdef9625188"

router.get('/oauth/redirect', (req, res) => {
  GitHubLogin(req.query.code);
  res.redirect("http://localhost:3000/")
})

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
  const accessToken =  tokenResponse.data.access_token
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  const name = result.data.name;
  console.log(result.data.name);
}

export default router;