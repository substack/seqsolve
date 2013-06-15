var gcd = require('gcd');
var permutationSolve = require('./permutation.js');
var simpleSolve = require('./simple_solve.js');

module.exports = function solve (xs) {
    var res = simpleSolve(xs);
    if (res) return res;
    
    var factor = xs.reduce(gcd);
    if (factor > 1) {
        return [ ['*', factor] ].concat(permutationSolve(xs.map(function (x) {
            return x / factor;
        })));
    }
    else return permutationSolve(xs);
}
