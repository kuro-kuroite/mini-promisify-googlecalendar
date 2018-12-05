"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OAuth = require("../../atoms/google_calendar/OAuth");

// import Promise from 'bluebird';
var withAuthorize = function withAuthorize(credentials) {
  return new Promise(function (resolve, reject) {
    (0, _OAuth.oauthAuthorize)(credentials).then(function (oAuth2Client) {
      // eslint-disable-next-line no-console
      console.log('in withAuthorize');
      resolve(oAuth2Client);
    }) // HACK: TODO uses oAuth2Client by getAccessToken or others
    // eslint-disable-next-line no-unused-vars
    .catch(function (err, oAuth2Client) {
      // TODO: ここに，getAccessToken をしてうまくいったら，resolve
      //       うまくいかなければ，reject(err) する
      // eslint-disable-next-line no-console
      console.log('TODO: create getAccessToken with Dialogflow');
      reject(err);
    });
  });
};

var _default = withAuthorize;
exports.default = _default;