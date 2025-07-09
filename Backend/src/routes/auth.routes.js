// src/routes/auth.routes.js

import express from 'express';
import passport from '../config/passport.js';
import { FRONTEND_URL } from '../config/discord.js';

const router = express.Router();

// ✅ 1. Start Discord OAuth2 Login
router.get('/login', passport.authenticate('discord'));

// ✅ 2. Discord OAuth2 Callback
router.get(
  '/callback',
  passport.authenticate('discord', {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: true,
  }),
  (req, res) => {
    const user = req.user;

    if (!user) {
      return res.redirect(`${FRONTEND_URL}/login?error=no-user`);
    }

    // ⚠️ Avoid sending sensitive info like tokens via query
    const userInfo = encodeURIComponent(
      JSON.stringify({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        discriminator: user.discriminator,
        email: user.email,
        guilds: user.guilds,
      })
    );

    res.redirect(`${FRONTEND_URL}/dashboard?user=${userInfo}`);
  }
);

// ✅ 3. Logout Route (optional)
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(`${FRONTEND_URL}/login`);
  });
});

export default router;
