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
}

function evaluate (terms) {
    var src = 'return '
        + Array(terms.length).join('(')
        + 'n'
        + terms.map(function (t) { return t.join('') }).join(')')
    ;
    return Function('n', src);
}
