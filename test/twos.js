var test = require('tape');
var solver = require('../');

test(function (t) {
    t.plan(1);
    
    var xs = solver.solve([ 2, 4, 6, 8, 10, 12 ]);
    t.deepEqual(xs, [ [ '+', 2 ] ]);
});
