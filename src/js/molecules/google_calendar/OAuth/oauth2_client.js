import { fsAsync } from '@kuro-kuroite/prelude';
import { OAuth2Client as _OAuth2Client } from '../../../atoms';

export default class OAuth2Client {
  constructor(
    tokenPath = process.env.TOKEN_PATH,
    clientSecretPath = process.env.CLIENT_SECRET_PATH,
  ) {
    this.tokenPath = tokenPath;
    // TODO: 以下のコードを必要としないようにしたい
    //       本来であればアクセストークンだけでカレンダーの予定を取得できるはず
    // NOTE: google.auth.OAuth2() で client_secret の情報が必要となるため指定
    this.clientSecretPath = clientSecretPath;
  }

  async withAuthorize(tokenPath = this.tokenPath) {
    const token = await this.fetchCredentials(tokenPath);

    // TODO: 以下のコードを必要としないようにしたい
    //       本来であればアクセストークンだけでカレンダーの予定を取得できるはず
    const oAuth2Client = new _OAuth2Client(this.clientSecretPath);
    await oAuth2Client.setCredentials(token);

    return oAuth2Client.oAuth2Client;
  }

  async fetchCredentials(tokenPath = this.tokenPath) {
    const token = await fsAsync.readFile(tokenPath, 'utf-8');
    return JSON.parse(token);
  }
}
