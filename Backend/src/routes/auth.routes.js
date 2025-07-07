import express from 'express';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, FRONTEND_URL } from '../config/discord.js';

const router = express.Router();

router.get('/login', (req, res) => {
  const scope = ['identify', 'email', 'guilds'].join('%20');
  const authURL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
  res.redirect(authURL);
});
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    scope: 'identify email guilds email'
  });
  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;
    res.redirect(`${FRONTEND_URL}/dashboard?token=${accessToken}`);
  } catch (err) {
    console.error(err.response.data);
    res.status(500).send("OAuth2 Login Failed");
  }
});
export default router;
