"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _google_calendar = require("../../molecules/google_calendar");

var listEvents = function listEvents(credentials) {
  return (0, _google_calendar.withAuthorize)(credentials).then(function (oauth2client) {
    return (0, _google_calendar.listEvents)(oauth2client);
  }).catch(function (err) {
    // eslint-disable-next-line no-console
    console.log("can't not authorise these credeatials");
    return Promise.reject(err);
  });
};

var _default = listEvents;
exports.default = _default;