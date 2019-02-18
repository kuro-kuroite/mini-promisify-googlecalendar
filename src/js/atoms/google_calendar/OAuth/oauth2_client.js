import { fsAsync } from '@kuro-kuroite/prelude';
import { google } from '..';

export default class OAuth2Client {
  constructor(clientSecretPath = process.env.CLIENT_SECRET_PATH) {
    this.clientSecretPath = clientSecretPath;
    this.oAuth2Client = null;
  }

  async setCredentials(token) {
    await this.factoryOAuthClientAsync();
    this.oAuth2Client.credentials = token;
  }

  async factoryOAuthClientAsync(clientSecretPath = this.clientSecretPath) {
    const credentials = await this.fetchCredentials(clientSecretPath);
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];

    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl,
    );
  }

  async fetchCredentials(clientSecretPath = this.clientSecretPath) {
    const clientSecret = await fsAsync.readFile(clientSecretPath, 'utf-8');
    return JSON.parse(clientSecret);
  }
}
