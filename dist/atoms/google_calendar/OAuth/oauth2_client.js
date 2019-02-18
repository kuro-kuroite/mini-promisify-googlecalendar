"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prelude = require("@kuro-kuroite/prelude");

var _ = require("..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OAuth2Client =
/*#__PURE__*/
function () {
  function OAuth2Client() {
    var clientSecretPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.CLIENT_SECRET_PATH;

    _classCallCheck(this, OAuth2Client);

    this.clientSecretPath = clientSecretPath;
    this.oAuth2Client = null;
  }

  _createClass(OAuth2Client, [{
    key: "setCredentials",
    value: function () {
      var _setCredentials = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(token) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.factoryOAuthClientAsync();

              case 2:
                this.oAuth2Client.setCredentials = token;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setCredentials(_x) {
        return _setCredentials.apply(this, arguments);
      }

      return setCredentials;
    }()
  }, {
    key: "factoryOAuthClientAsync",
    value: function () {
      var _factoryOAuthClientAsync = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var clientSecretPath,
            credentials,
            clientSecret,
            clientId,
            redirectUrl,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clientSecretPath = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : this.clientSecretPath;
                _context2.next = 3;
                return this.fetchCredentials(clientSecretPath);

              case 3:
                credentials = _context2.sent;
                clientSecret = credentials.installed.client_secret;
                clientId = credentials.installed.client_id;
                redirectUrl = credentials.installed.redirect_uris[0];
                this.oAuth2Client = new _.google.auth.OAuth2(clientId, clientSecret, redirectUrl);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function factoryOAuthClientAsync() {
        return _factoryOAuthClientAsync.apply(this, arguments);
      }

      return factoryOAuthClientAsync;
    }()
  }, {
    key: "fetchCredentials",
    value: function () {
      var _fetchCredentials = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var clientSecretPath,
            clientSecret,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                clientSecretPath = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : this.clientSecretPath;
                _context3.next = 3;
                return _prelude.fsAsync.readFile(clientSecretPath, 'utf-8');

              case 3:
                clientSecret = _context3.sent;
                return _context3.abrupt("return", JSON.parse(clientSecret));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchCredentials() {
        return _fetchCredentials.apply(this, arguments);
      }

      return fetchCredentials;
    }()
  }]);

  return OAuth2Client;
}();

exports.default = OAuth2Client;