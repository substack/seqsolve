var cf = require('continued-fraction');
var solver = require('../');
var ops = [ '+', '-', '*', '/' ];
var nums = [ 1, 2, 'n' ];

//var sequence = [ 0, 1, 6, 3, 1, 7, 2, 1, 3, 1, 1, 1, 2, 18, 1, 1, 1, 2 ];
//var sequence = [ 0, 1, 2, 3, 4 ]; // SOLVED
//var sequence = [ 2, 4, 8, 16, 32, 64 ]; // SOLVED
//var sequence = [ 1, 3, 5, 7, 9 ];
var sequence = process.argv.slice(2).map(Number);
var best = 0;

function check (f) {
    var x = sequence[0];
    for (var i = 1; i < sequence.length; i++) {
        x = f(x);
        if (x !== sequence[i]) {
            if (i > best) {
                best = i;
                console.log('best (' + best + '): ' + pretty(f));
            }
            return false;
        }
    }
    return true;
}

var partials = [];
ops.forEach(function (op) {
    nums.forEach(function (n) {
        partials.push([ op, n ]);
    });
});

for (var i = 1; true; i++) {
    combinations(partials, i, function (comb) {
        var f = solver.eval(comb);
        if (check(f)) {
            console.dir(comb);
            process.exit(0);
        };
    });
}

function combinations (xs, n, f) {
    if (n === 1) return xs.forEach(function (x) { f([x]) });
    xs.forEach(function (x) {
        combinations(xs, n-1, function (x_) {
            f([x].concat(x_));
        });
    });
}

function pretty (f) {
    return (f+'').replace(/\n/g,'')
        .replace(/^function anonymous\(n\) {return /, '')
        .replace(/}$/, '')
    ;
}
