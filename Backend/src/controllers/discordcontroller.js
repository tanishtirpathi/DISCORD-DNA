import axios from 'axios';
import { generateName } from '../utils/name';
export const getUserData = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  try {
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const guildRes = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = userRes.data;
    const guilds = guildRes.data;
    const persona = generatePersona(user.username, user.locale);
    res.json({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      locale: user.locale,
      persona,
      guilds
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: "Failed to fetch user data" });
  }
};
