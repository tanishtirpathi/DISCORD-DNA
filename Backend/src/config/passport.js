import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import dotenv from 'dotenv';
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_CALLBACK_URL } = process.env;
dotenv.config();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'email', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Later: save to MongoDB here
        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_CALLBACK_URL) {
  throw new Error("❌ Missing Discord OAuth environment variables in .env file!");
}

passport.serializeUser((user, done) => {
  done(null, user);
});
assport.use(new DiscordStrategy({
  clientID: DISCORD_CLIENT_ID,
  clientSecret: DISCORD_CLIENT_SECRET,
  callbackURL: DISCORD_CALLBACK_URL,
  scope: ['identify', 'email', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));  ` ` ` ` ``
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ✅ Export it properly
export default passport;
