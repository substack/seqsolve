#!/usr/bin/env node

var solver = require('../');
var sequence = process.argv.slice(2).map(Number);

var f = solver(sequence);
console.log(pretty(f));

function pretty (f) {
    return (f+'').replace(/\n/g,'')
        .replace(/^function anonymous\(n\) {return /, '')
        .replace(/}$/, '')
    ;
}
