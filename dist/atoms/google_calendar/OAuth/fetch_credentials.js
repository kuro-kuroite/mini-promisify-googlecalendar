"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Promise from 'bluebird';
var fetchCredentials = function fetchCredentials() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'token.json';
  return new Promise(function (resolve, reject) {
    _fs.default.readFile(path, function (err, token) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('should setup token'); // NOTE: 外部に委託

        reject(err);
        return;
      }

      resolve(JSON.parse(token));
    });
  });
};

var _default = fetchCredentials;
exports.default = _default;