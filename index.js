var permutationSolve = require('./lib/permutation.js');
var gcd = require('gcd');

exports = module.exports = function (xs) {
    return evaluate(solve(xs));
};
exports.solve = solve;
var evaluate = exports.eval = require('./lib/eval.js');

function solve (xs) {
    var res = [];
    
    // linear
    var slope = xs[1] - xs[0];
    for (var i = 1; i < xs.length - 1; i++) {
        if (xs[i+1] - xs[i] !== slope) break;
    }
    if (i === xs.length - 1) {
        return [ [ '+', slope ] ];
    }
    
    // geometric
    var mean = xs[1] / xs[0];
    for (var i = 1; i < xs.length - 1; i++) {
        if (xs[i+1] / xs[i] !== mean) break;
    }
    if (i === xs.length - 1) {
        return [ [ '*', mean ] ];
    }
    
    var factor = xs.reduce(gcd);
    if (factor > 1) {
        return [ ['*', factor] ].concat(permutationSolve(xs.map(function (x) {
            return x / factor;
        })));
    }
    else return permutationSolve(xs);
}
