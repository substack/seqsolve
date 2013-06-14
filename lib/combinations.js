module.exports = function combinations (xs, n) {
    var i = 0;
    if (n === 1) return function () {
        if (i >= xs.length) return undefined
        else return [xs[i++]]
    };
    
    var next = combinations(xs, n-1);
    
    return function () {
        var x_ = next();
        if (x_ === undefined) {
            if (++i >= xs.length) return undefined;
            next = combinations(xs, n-1);
            x_ = next();
        }
        return [xs[i]].concat(x_);
    };
};
