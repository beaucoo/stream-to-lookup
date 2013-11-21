/*jshint node: true, expr:true */
/*global require, module, describe, beforeEach, it */


var _ = require('lodash');
var through = require('through');


function getKeyFunc(key) {
    "use strict";

    if (_.isString(key)) {
        return function (data) {
            return data[key];
        }
    } else if (_.isFunction(key)) {
        return key;
    } else {
        throw "Invalid key";
    }
}


function getValueFunc(value) {
    "use strict";

    if (!value) {
        return function (data) {
            return data;
        }
    } else if (_.isString(value)) {
        return function (data) {
            return data[value];
        }
    } else if (_.isFunction(value)) {
        return value;
    } else {
        return function () {
            return value;
        }
    }
}


module.exports = function streamToLookup(key, value, callback) {
    "use strict";

    var lookup = {};
    var getKey = getKeyFunc(key);
    var getValue = getValueFunc(value);

    return through()
        .on('error', callback)
        .on('data', function (data) {
            lookup[getKey(data)] = getValue(data);
        })
        .on('end', function () {
            callback(null, lookup);
        });
};