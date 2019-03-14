"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prelude = require("@kuro-kuroite/prelude");

var _atoms = require("../../../atoms");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OAuth2Client =
/*#__PURE__*/
function () {
  function OAuth2Client() {
    var tokenPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.TOKEN_PATH;
    var clientSecretPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.CLIENT_SECRET_PATH;

    _classCallCheck(this, OAuth2Client);

    this.tokenPath = tokenPath; // TODO: 以下のコードを必要としないようにしたい
    //       本来であればアクセストークンだけでカレンダーの予定を取得できるはず
    // NOTE: google.auth.OAuth2() で client_secret の情報が必要となるため指定

    this.clientSecretPath = clientSecretPath;
  }

  _createClass(OAuth2Client, [{
    key: "withAuthorize",
    value: function () {
      var _withAuthorize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var tokenPath,
            token,
            oAuth2Client,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tokenPath = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.tokenPath;
                _context.next = 3;
                return this.fetchCredentials(tokenPath);

              case 3:
                token = _context.sent;
                // TODO: 以下のコードを必要としないようにしたい
                //       本来であればアクセストークンだけでカレンダーの予定を取得できるはず
                oAuth2Client = new _atoms.OAuth2Client(this.clientSecretPath);
                _context.next = 7;
                return oAuth2Client.setCredentials(token);

              case 7:
                return _context.abrupt("return", oAuth2Client.oAuth2Client);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function withAuthorize() {
        return _withAuthorize.apply(this, arguments);
      }

      return withAuthorize;
    }()
  }, {
    key: "fetchCredentials",
    value: function () {
      var _fetchCredentials = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var tokenPath,
            token,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tokenPath = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : this.tokenPath;
                _context2.next = 3;
                return _prelude.fsAsync.readFile(tokenPath, 'utf-8');

              case 3:
                token = _context2.sent;
                return _context2.abrupt("return", JSON.parse(token));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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