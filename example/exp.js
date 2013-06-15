var solver = require('../');
var f = solver([ 1, 4, 9, 16, 25, 36, 49, 64, 81 ]);
console.log(pretty(f));

function pretty (f) {
    return (f+'').replace(/\n/g,'')
        .replace(/^function anonymous\(n\) {return /, '')
        .replace(/}$/, '')
    ;
}
