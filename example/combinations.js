var cf = require('continued-fraction');
var solver = require('../');
var ops = [ '+', '-', '*', '/' ];
var constants = [ 1, 2, 'n' ];

//var sequence = [ 0, 1, 6, 3, 1, 7, 2, 1, 3, 1, 1, 1, 2, 18, 1, 1, 1, 2 ];
//var sequence = [ 0, 1, 2, 3, 4 ]; // SOLVED
//var sequence = [ 2, 4, 8, 16, 32, 64 ]; // SOLVED
var sequence = [ 1, 3, 5, 7, 9 ];
var best = 0;

function check (f) {
    var x = sequence[0];
    for (var i = 1; i < sequence.length; i++) {
        x = f(x);
        if (x !== sequence[i]) {
            if (i > best) {
                best = i;
                console.log('best: ' + best);
            }
            return false;
        }
    }
    return true;
}

var partials = [];
ops.forEach(function (op) {
    constants.forEach(function (c) {
        partials.push([ op, c ]);
    });
});

for (var i = 0; i < partials.length; i++) {
    var combs = combinations(partials, i + 1);
    for (var j = 0; j < combs.length; j++) {
        var f = solver.eval(combs[j]);
        if (check(f)) {
            console.dir(combs[j]);
            console.log('[i,j]=' + JSON.stringify([i,j]));
            console.log(new Date);
            return;
        };
    }
}

function combinations (xs, n) {
    if (n === 1) return xs.map(function (x) { return [x] });
    var res = [];
    xs.forEach(function (x) {
        combinations(xs, n-1).forEach(function (x_) {
            res.push([x].concat(x_));
        });
    });
    return res;
}
