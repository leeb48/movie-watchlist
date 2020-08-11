type OAuthConfig = {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  passReqToCallback: boolean;
};

export const OAuthConfig: OAuthConfig = {
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/redirect',
  passReqToCallback: true,
};
