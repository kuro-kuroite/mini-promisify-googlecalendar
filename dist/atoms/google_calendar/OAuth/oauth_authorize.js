"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _googleapis = require("googleapis");

var _fetch_credentials = _interopRequireDefault(require("./fetch_credentials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Promise from 'bluebird';
// TODO: config に移動
var TOKEN_PATH = 'token.json';

var oauthAuthorize = function oauthAuthorize(credentials) {
  return new Promise(function (resolve, reject) {
    // HACK: credential json has camelcase keys
    // eslint-disable-next-line camelcase
    var client_secret = credentials.client_secret,
        client_id = credentials.client_id,
        redirect_uris = credentials.redirect_uris;
    var oAuth2Client = new _googleapis.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    (0, _fetch_credentials.default)(TOKEN_PATH).then(function (token) {
      oAuth2Client.setCredentials(token);
      resolve(oAuth2Client);
    }).catch(function (err) {
      // eslint-disable-next-line no-console
      console.log("can't fetch token"); // eslint-disable-next-line no-console

      console.log('should try to authorize oauth and call setCredentials');
      reject(err, oAuth2Client);
    });
  });
};

var _default = oauthAuthorize;
exports.default = _default;