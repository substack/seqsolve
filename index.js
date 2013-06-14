var permutationSolve = require('./lib/permutation.js');
var gcd = require('gcd');

exports = module.exports = function (xs) {
    return evaluate(simplify(solve(xs)));
};
exports.solve = function (xs) {
    return simplify(solve(xs));
};
var evaluate = exports.eval = require('./lib/eval.js');

function simplify (terms) {
    return terms.filter(function (t) {
        if (t[0] === '*' && t[1] === 1) return false;
        if (t[0] === '/' && t[1] === 1) return false;
        if (t[0] === '+' && t[1] === 0) return false;
        if (t[0] === '-' && t[1] === 0) return false;
        return true;
    });
}

function solve (xs) {
    var res = [];
    
    // linear
    var slope = xs[1] - xs[0];
    for (var i = 1; i < xs.length - 1; i++) {
        if (xs[i+1] - xs[i] !== slope) break;
    }
    if (i === xs.length - 1) {
        var b = xs[0] - slope;
        return [ [ '*', slope ], [ '+', b ] ];
    }
    
    // geometric
    var mean = xs[1] / xs[0];
    for (var i = 1; i < xs.length - 1; i++) {
        if (xs[i+1] / xs[i] !== mean) break;
    }
    if (i === xs.length - 1) {
        var x = xs[0] / mean;
        return [ [ mean, '^' ], (x > 1 ? [ '*', x ] : [ '/', 1 / x ]) ];
    }
    
    var factor = xs.reduce(gcd);
    if (factor > 1) {
        return [ ['*', factor] ].concat(permutationSolve(xs.map(function (x) {
            return x / factor;
        })));
    }
    else return permutationSolve(xs);
}
