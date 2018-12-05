// TODO: spec 形式への書き換え
// eslint-disable-next-line no-console
// NOTE: require client_secret.json and token.json
// NOTE: must transfer this file by Babel
import { fetchClientSecret, listEvents } from '../dist';

console.log('NOTE: require client_secret.json and token.json');

// TODO: config に移動
const CLIENT_SECRET_PATH = 'client_secret.json';

const listEventsSpec = (clientSecretPath = CLIENT_SECRET_PATH) => {
  fetchClientSecret(clientSecretPath, 'installed')
    .then(credentials => {
      // eslint-disable-next-line no-console
      console.log('fetchClientSecret then');
      // eslint-disable-next-line no-console
      console.log('before listEvents');
      return listEvents(credentials);
    })
    .then(events => {
      // NOTE: ひとまず，console.log出力とする
      // eslint-disable-next-line no-console
      console.log('fetched event');
      // eslint-disable-next-line no-console
      console.log(events);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('error');
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

listEventsSpec();
