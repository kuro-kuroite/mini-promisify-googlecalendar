!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("googleapis")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("bluebird")},function(e,n){e.exports=require("@babel/polyfill")},function(e,n,t){"use strict";t.r(n);t(3);var o=t(0),r=t(1),i=t.n(r),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"token.json";return new Promise(function(n,t){i.a.readFile(e,function(e,o){if(e)return console.log("should setup token"),void t(e);n(JSON.parse(o))})})},c=function(e){return new Promise(function(n,t){var r=e.client_secret,i=e.client_id,c=e.redirect_uris,l=new o.google.auth.OAuth2(i,r,c[0]);u("token.json").then(function(e){l.setCredentials(e),n(l)}).catch(function(e){console.log("can't fetch token"),console.log("should try to authorize oauth and call setCredentials"),t(e,l)})})},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"client_secret.json",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"installed";return new Promise(function(t,o){i.a.readFile(e,function(e,r){if(e)return console.log("can't fetch client secret"),console.log("should try to get client_secret.json from google console"),void o(e);t(JSON.parse(r)[n])})})},a=t(2),s=t.n(a),f=function(e){return new s.a(function(n,t){o.google.calendar("v3").events.list({auth:e,calendarId:"primary",timeMin:new Date(Date.parse("2018-07-16")).toISOString(),timeMax:new Date(Date.parse("2018-07-19")).toISOString(),singleEvents:!0,orderBy:"startTime"},function(e,o){if(e)return console.log("The API returned an error: ".concat(e)),void t(e);n(o.data.items)})})},d=function(e){return new Promise(function(n,t){c(e).then(function(e){console.log("in withAuthorize"),n(e)}).catch(function(e,n){console.log("TODO: create getAccessToken with Dialogflow"),t(e)})})},g=l,h=function(e){return d(e).then(function(e){return f(e)}).catch(function(e){return console.log("can't not authorise these credeatials"),Promise.reject(e)})},p=d;t.d(n,"google",function(){return o.google}),t.d(n,"fetchClientSecret",function(){return g}),t.d(n,"listEvents",function(){return h}),t.d(n,"withAuthorize",function(){return p})}]);