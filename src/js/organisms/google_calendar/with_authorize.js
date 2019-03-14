import { OAuth2Client } from '../../molecules';

export default async function withAuthorize(
  tokenPath = process.env.TOKEN_PATH,
  clientSecretPath = process.env.CLIENT_SECRET_PATH,
) {
  const oAuth2Client = new OAuth2Client(tokenPath, clientSecretPath);

  return oAuth2Client.withAuthorize(tokenPath);
}
