"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withAuthorize;

var _molecules = require("../../molecules");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function withAuthorize() {
  return _withAuthorize.apply(this, arguments);
}

function _withAuthorize() {
  _withAuthorize = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var tokenPath,
        clientSecretPath,
        oAuth2Client,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenPath = _args.length > 0 && _args[0] !== undefined ? _args[0] : process.env.TOKEN_PATH;
            clientSecretPath = _args.length > 1 && _args[1] !== undefined ? _args[1] : process.env.CLIENT_SECRET_PATH;
            oAuth2Client = new _molecules.OAuth2Client(tokenPath, clientSecretPath);
            return _context.abrupt("return", oAuth2Client.withAuthorize(tokenPath));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _withAuthorize.apply(this, arguments);
}