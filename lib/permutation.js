var evaluate = require('../').eval;
var combinations = require('./combinations.js');

module.exports = function (sequence, opts) {
    if (!opts) opts = {};
    var upperBound = opts.upperBound || Number.MAX_VALUE;
    
    var ops = opts.operators || [ '+', '-', '*', '/' ];
    var nums = opts.terms || [ 1, 2, 'n' ];
    
    function check (f) {
        for (var i = 0; i < sequence.length; i++) {
            var x = f(i+1);
            if (x !== sequence[i]) return false;
        }
        return true;
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
            if (check(f)) {
                return comb;
            };
        }
    }
};
