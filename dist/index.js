"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "google", {
  enumerable: true,
  get: function get() {
    return _atoms.google;
  }
});
Object.defineProperty(exports, "OAuth2Client", {
  enumerable: true,
  get: function get() {
    return _molecules.OAuth2Client;
  }
});
Object.defineProperty(exports, "withAuthorize", {
  enumerable: true,
  get: function get() {
    return _organisms.withAuthorize;
  }
});

var _prelude = require("@kuro-kuroite/prelude");

var _atoms = require("./atoms");

var _molecules = require("./molecules");

var _organisms = require("./organisms");

(0, _prelude.configEnv)();