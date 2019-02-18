"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "google", {
  enumerable: true,
  get: function get() {
    return _googleapis.google;
  }
});
Object.defineProperty(exports, "OAuth2Client", {
  enumerable: true,
  get: function get() {
    return _oauth2_client.default;
  }
});

var _googleapis = require("googleapis");

var _oauth2_client = _interopRequireDefault(require("./OAuth/oauth2_client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }