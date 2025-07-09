import dotenv from 'dotenv';
dotenv.config();
console.log('Discord Client ID:', process.env.DISCORD_CLIENT_ID); // 👈 Add this    
export const CLIENT_ID = process.env.DISCORD_CLIENT_ID; // Your Discord application's client ID
export const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET; // Your Discord application's client secret
export const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI; // Your Discord application's redirect URI
export const FRONTEND_URL = process.env.FRONTEND_URL; // Your frontend URL (e.g., http://localhost:3000)
