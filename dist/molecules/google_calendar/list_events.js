"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _google_calendar = require("../../atoms/google_calendar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listEvents = function listEvents(auth) {
  return new _bluebird.default(function (resolve, reject) {
    var calendar = _google_calendar.google.calendar('v3');

    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      // TOOD: 取り出す時間を引数で変更できるように拡張
      timeMin: new Date(Date.parse('2018-07-16')).toISOString(),
      timeMax: new Date(Date.parse('2018-07-19')).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    }, function (err, response) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log("The API returned an error: ".concat(err));
        reject(err);
        return;
      }

      resolve(response.data.items);
    });
  });
};

var _default = listEvents;
exports.default = _default;