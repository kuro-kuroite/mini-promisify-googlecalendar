"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Promise from 'bluebird';
var fetchClientSecret = function fetchClientSecret() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'client_secret.json';
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'installed';
  return new Promise(function (resolve, reject) {
    _fs.default.readFile(path, function (err, clientSecret) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log("can't fetch client secret"); // eslint-disable-next-line no-console

        console.log('should try to get client_secret.json from google console');
        reject(err);
        return;
      }

      resolve(JSON.parse(clientSecret)[key]);
    });
  });
};

var _default = fetchClientSecret;
exports.default = _default;