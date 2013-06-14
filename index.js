var solve = require('./lib/solve.js');

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
