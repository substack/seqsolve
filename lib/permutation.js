var evaluate = require('./eval.js');
var combinations = require('./combinations.js');
var simpleSolve = require('./simple_solve.js');

module.exports = function (sequence, opts) {
    if (!opts) opts = {};
    var upperBound = opts.upperBound || Number.MAX_VALUE;
    
    var ops = opts.operators || [ '+', '-', '*', '/' ];
    var nums = opts.terms || [ 1, 2, 'n' ];
    
    function check (f) {
        var lin = [];
        var equal = true;
        
        for (var i = 0; i < sequence.length; i++) {
            var x = f(i+1);
            lin.push(sequence[i] - x);
            if (x !== sequence[i]) equal = false;
        }
        
        if (equal) return [];
        if (!equal) {
            var linTerms = simpleSolve(lin);
            if (linTerms) {
                if (linTerms[0][0] === '*' && linTerms[0][1] === 0) {
                    linTerms.shift();
                }
                return linTerms;
            }
        }
        return false;
    }
    
    var partials = [];
    ops.forEach(function (op) {
        nums.forEach(function (n) {
            partials.push([ op, n ]);
        });
    });
    
    for (var i = 1; i < upperBound; i++) {
        var next = combinations(partials, i);
        for (var comb; comb = next(); comb !== undefined) {
            var f = evaluate(comb);
            var terms = check(f);
            if (terms) return comb.concat(terms);
        }
    }
};
