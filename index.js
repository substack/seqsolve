exports = module.exports = function (xs) {
    return evaluate(solve(xs));
};
exports.solve = solve;
exports.eval = evaluate;

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
}

function evaluate (terms) {
    var src = 'return '
        + terms.map(function (t) {
            if (t[0] === '/') return 'Math.floor(';
            else return '(';
        }).join('')
        + 'n'
        + terms.map(function (t) {
            if (t[0] === '/') {
                return t[0] + '(' + t[1] + ')';
            }
            return t[0] + '(' + t[1] + ')';
        }).join(')')
        + ')'
    ;
    return Function('n', src);
}
