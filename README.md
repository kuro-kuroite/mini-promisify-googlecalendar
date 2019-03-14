# mini-promisify-googlecalendar

googleapis が求めるgoogle.auth.OAuth2を，クライアント情報とトークン情報から取得するミニライブラリ

## インストール方法

```bash
$ yarn add https://github.com/kuro-kuroite/mini-promisify-googlecalendar.git
```

## 最低動作例

- 本サンプルの依存ライブラリをインストール

```bash
$ yarn add @babel/core @babel/register @babel/polyfill
$ yarn add googleapis@35.0.0
$ yarn add date-fns@2.0.0-alpha.25
```

- [Google Calendar API
 Node.js Quickstart](https://developers.google.com/calendar/quickstart/nodejs) から，2つの設定データを取得

  - ステップ1 で [`client_secret.json`](#client) を取得
  - ステップ2, 3, 4 で [`token.json`](#token) を取得
  - これらを，本サンプルと同じディレクトリに移動
  - 上記の部分は，ライブラリ化出来ていない．// TODO
    というのも，OAuth 2.0の使用とGoogle API の仕様を理解しきれなかったためである
    具体的には，`client_secret.json` の`redirect_uris`で`token.json` の取得プログラムが変わるため．
    (polling が必要だとか，必要でないとか... ，express がいるのか？)

- 以下(index.js)を `node --require @babel/register index.js`で実行

```js
import '@babel/polyfill';
import { google } from 'googleapis';
import { endOfDay } from 'date-fns/esm';
import { withAuthorize } from '@kuro-kuroite/mini-promisify-googlecalendar';

// google calendar API 経由で情報を取得する関数の一例
// 今回は，指定した期間のイベントを取得する関数とする
// auth を取得すれば，google.calendar('v3') で様々な操作を可能とする
const listEvents = (auth, startAt, endAt = endOfDay(startAt)) =>
  new Promise((resolve, reject) => {
    const calendar = google.calendar('v3');

    calendar.events.list(
      {
        auth,
        calendarId: 'primary',

        timeMin: startAt,
        timeMax: endAt,

        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, response) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(`The API returned an error: ${err}`);
          reject(err);
          return;
        }

        resolve(response.data.items);
      },
    );
  });

const TOKEN = 'token.json';
const CLIENT_SECRET = 'client_secret.json';

(async () => {
  try {
    const auth = await withAuthorize(TOKEN, CLIENT_SECRET);
    const events = await listEvents(auth, new Date().toISOString());

    // eslint-disable-next-line no-console        
    console.log(events);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
```

## 公開APIの詳細

基本的には，`withAuthorize`関数を知っていればよい．

#### withAuthorize(tokenPath: string, clientSecretPath: string): Promise<google.auth.OAuth2>

この関数は，Google API の[クライアント](#client)と[トークン](#token)のファイルパスから情報を取得し，
Google API(googleapis) が要求する認証情報`google.auth.OAuth2`を返却する`Promise`を返す

<a name="client"></a>
- client_secret.json.sample

いくつか種類があるので，以下は一例．

- [OAuth 2.0 画面なしデバイス](https://developers.google.com/identity/protocols/OAuth2ForDevices)
- [OAuth 2.0 Web サーバアプリケーション](https://developers.google.com/identity/protocols/OAuth2WebServer)

```json
{
  "installed": {
    "client_id": "rndawlirntseaorndahrtasporntaspodninrpanr.apps.googleusercontent.com",
    "project_id":"organic-gecko-210102",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://www.googleapis.com/oauth2/v3/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"rndwouitsnastpadie",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "http://localhost"
    ],
  },
}
```

<a name="token"></a>
- token.json.sample

```json
{
 "access_token": "rntasoprndaoprntseoaprntsapofndritreaostrnjvnatpkudwionrtjaspgntrspoarntndinr",
 "token_type": "Bearer",
 "expires_in": 3600,
 "refresh_token": "dnidhrdpapnirdinidhrtoap"
}
```

## 本ライブラリの開発者向け

### 開発

このライブラリは，src/js/index.js(理由: `yarn deploy`)がメインプログラムの記述箇所である．
ライブラリとして公開されている関数，クラスはこのファイルの`export`のみである．
もちろん，ダーティーハックで非公開部分の変更は可能である．

基本的なディレクトリ構成は，[Atomic Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/) を採用した．
すなわち，原子(atom) -> 分子(molecule) -> 有機体(organism) の多重階層となっている．
これは，Promise化といった単純な関数をatomsに，公開する関数やクラスを organisms に，このorganismsが使用する子関数，子クラスをmolecules に分類するためだ．

この階層の中身は，`ライブラリ・種類名/機能名 or index.js` とした．
特別な意味はないが，ファイルよりはディレクトリとして小分類したかったためである．
内部実装が気になる場合は，この部分のjsファイルを参照するとよい．

もし，本ライブラリを変更した場合は，`yarn deploy`をすると，`dist/` ディレクトリに [Babel](https://babeljs.io/) される．
簡単な実行であれば，`yarn babel-node path/to/file.js` するとよい．
念のために，`sandbox/`は自由に使える場所としており，`yarn deploy:sandbox && node tmp/file.js` でテストも可能だ．

### 整形

もし，jsファイルを整形したい場合は，`yarn .lint` または，`yarn .prettier:all` を試してほしい．
この部分は特にこだわって，作成した．
`scripts/` 以下が，npm-scripts 用のコマンドの実装となっている．

もし，この部分の.babel.jsファイルを変更した場合，`yarn .babel:all`をすると，.js も変更される．

## 最後に

本ライブラリは，出来るだけ美しい開発が出来るように，ディレクトリの階層と整形処理に時間をかけた．
プロジェクトルートにある他のドットファイルについて説明しきれなかったが，もし気になる場合は調べたうえで是非とも試してみてほしい．

補足であるが，JavaScript(Node.js) を使用する場合は，絶対にBabelとPromise(async, await or callback)の理解が必須である．
Babelで最新の書き方を覚え，Node.jsの非同期処理に慣れた後に，自分なりに新しいライブラリを作成してほしい．
ただ，最近はTypeScript が主流みたいなので，挑戦したい方はそちらがいいかもしれない．JS の上位互換でBabelは勝手にやってくれるみたいだし．

その際に，本ライブラリのディレクトリの階層と設定ファイルを参考にしてくれると幸いである．

あぁ，あと強者はWebpackをやるのがよい時間つぶしになるだろう．かといって，Parcelが良いというわけでもない．
私は「Webpack疲れ」をしたのでお勧めはしないが...．あれは，大量の素晴らしいエラーを吐いてくれたので最高？のツールだから．

### License

- [MIT](https://github.com/taeukme/google-home-push/blob/master/LICENSE.md)
