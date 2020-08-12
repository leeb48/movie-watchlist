type OAuthConfig = {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
};

export const OAuthConfig: OAuthConfig = {
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/redirect',
  scope: ['email', 'profile'],
};
