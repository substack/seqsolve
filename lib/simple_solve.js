module.exports = function (xs) {
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
    
    return false;
};
