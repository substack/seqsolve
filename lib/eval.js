module.exports = function (terms) {
    var src = 'return '
        + terms.map(function (t) {
            if (t[0] === '/') return 'Math.floor(';
            if (t[1] === '^') return 'Math.pow(' + t[0] + ',';
            else return '(';
        }).join('')
        + 'n'
        + terms.map(function (t) {
            if (t[0] === '/') {
                return t[0] + '(' + t[1] + ')';
            }
            else if (t[1] === '^') {
                return '';
            }
            return t[0] + '(' + t[1] + ')';
        }).join(')')
        + ')'
    ;
    return Function('n', src);
};
