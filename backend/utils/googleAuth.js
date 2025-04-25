import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export { oauth2Client };

// Generate Auth URL to get the authorization code
export const getGoogleAuthURL = () => {
    const scopes = ['https://www.googleapis.com/auth/calendar.events'];
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
};

// Get access & refresh tokens
export const getGoogleTokens = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

// Set tokens for authenticated requests
export const setGoogleAuthCredentials = (tokens) => {
    oauth2Client.setCredentials(tokens);
};

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
