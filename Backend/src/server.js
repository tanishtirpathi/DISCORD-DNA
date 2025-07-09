import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// CORS (Allow credentials for cookies + session)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// 🔐 Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// 🔑 Passport setup
app.use(passport.initialize());
app.use(passport.session());

// 🌐 Routes
app.use('/auth', authRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🚀 Discord Analyzer Backend is Live!');
});

// 🧠 User status route (for frontend to check login)
app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
