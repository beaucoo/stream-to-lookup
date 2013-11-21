/*jshint node: true, expr:true */
/*global describe, beforeEach, it, require */

require('must'); // https://github.com/moll/js-must/blob/master/doc/API.md#Must
var _ = require('lodash');
var es = require('event-stream');


describe("Code", function () {
    "use strict";

    var data1 = {id: "id1", value: "value1", count: 1};
    var data2 = {id: "id2", value: "value2", count: 2};
    var data = [data1, data2];


    var streamToLookup = require("../lib/stream-to-lookup");


    it("should use key by name", function (done) {
        es.readArray(data).pipe(streamToLookup("id", null, function (err, lookup) {
            (!err).must.be.true;
            _.keys(lookup).must.eql(["id1", "id2"]);
            done();
        }));
    });


    it("should use key by function", function (done) {
        var keyFunc = function (data) {
            return data.id + "_suffix";
        };

        es.readArray(data).pipe(streamToLookup(keyFunc, null, function (err, lookup) {
            (!err).must.be.true;
            _.keys(lookup).must.eql(["id1_suffix", "id2_suffix"]);
            done();
        }));
    });


    it("should use value by name", function (done) {
        es.readArray(data).pipe(streamToLookup("id", "value", function (err, lookup) {
            (!err).must.be.true;
            _.values(lookup).must.eql(["value1", "value2"]);
            done();
        }));
    });


    it("should use whole data structure as value", function (done) {
        es.readArray(data).pipe(streamToLookup("id", null, function (err, lookup) {
            (!err).must.be.true;
            _.values(lookup).must.eql(data);
            done();
        }));
    });


    it("should use non-string as value", function (done) {
        es.readArray(data).pipe(streamToLookup("id", true, function (err, lookup) {
            (!err).must.be.true;
            _.values(lookup).must.eql([true, true]);
            done();
        }));
    });


    it("should use function as value", function (done) {
        var valueFunc = function (data) {
            return data.value + "-" + data.count;
        };

        es.readArray(data).pipe(streamToLookup("id", valueFunc, function (err, lookup) {
            (!err).must.be.true;
            _.values(lookup).must.eql(["value1-1", "value2-2"]);
            done();
        }));
    });
});