var test = require('tape');
var solver = require('../');

test('squared', function (t) {
    t.plan(1);
    var xs = [ 1, 4, 9, 16, 25, 36, 49, 64, 81 ];
    
    var f = solver(xs);
    var res = [];
    for (var i = 0; i < xs.length; i++) res.push(f(i+1));
    t.deepEqual(res, xs);
});

test('squared hundreds', function (t) {
    t.plan(1);
    var xs = [ 100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100 ];
    
    var f = solver(xs);
    var res = [];
    for (var i = 0; i < xs.length; i++) res.push(f(i+1));
    t.deepEqual(res, xs);
});
