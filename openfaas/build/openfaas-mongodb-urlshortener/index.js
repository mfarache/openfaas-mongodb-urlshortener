"use strict"

let getStdin = require('get-stdin');
let handler = require('./function/handler');

getStdin().then(val => {
    handler(val, (err, res) => {
        if (err == null) {
          if(isArray(res) || isObject(res)) {
              console.log(JSON.stringify(res));
          } else {
              console.log(res);
              process.exit(0);
          }
        } else {
          if (err) {
              return console.error(err);
          }
        }
    });
}).catch(e => {
    console.error(e.stack);
});

let isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

let isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};
