#Stream-To-Lookup

Stream JSON data and pivot it into a lookup format i.e. associative array

Install via <code>npm install stream-to-lookup</code>

<pre>
// Example (see tests for more):

<code>
// Incoming JSON data
var data1 = {id:"id1", value:"value1", count:1};
var data2 = {id:"id2", value:"value2", count:2};
var inJsonStream = [data1, data2];


var streamToLookup = require('stream-to-lookup'); // Parameters (key, value, callback)


// Example 1: Key by field name w/ full data structure as value
inJsonStream.pipe(streamToLookup("id", null, function(err, lookup) {
    // Results in 'lookup' equaling
    {
      id1:data1,
      id2:data2
    }
}));


// Example 2: Key by function w/ value true
var keyFunc = function(data) {
    return data.id + "_suffix";
}

inJsonStream.pipe(streamToLookup(keyFunc, true, function(err, lookup) {
    // Results in 'lookup' equaling
    {
      id1_suffix:true,
      id2_suffix:true
    }
}));


// Example 3: Values from 'value' field
inJsonStream.pipe(streamToLookup("id", "value", function(err, lookup) {
    // Results in 'lookup' equaling
    {
      id1:"value1",
      id2:"value2"
    }
}));


// Example 4: Values from function
var valueFunc = function(data) {
    return data.id + "-" + data.count;
}

inJsonStream.pipe(streamToLookup("id", valueFunc, function(err, lookup) {
    // Results in 'lookup' equaling
    {
      id1:"value1-1",
      id2:"value2-2"
    }
}));
</code>
</pre>


##Release Notes
v0.0.1 First

##Running Tests

* Run 'npm test'
* or run `mocha test --require must --reporter spec --recursive`

##License
(The MIT License)

Copyright (c) 2013-20* BeauCoo Technologies Inc. <info@beaucoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

