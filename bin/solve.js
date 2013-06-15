#!/usr/bin/env node

var solver = require('../');
var argv = require('optimist').boolean('c', 'continue').argv;

var expr = argv.e || argv.expr;
if (expr) {
    var i = argv.i === undefined ? 1 : argv.i;
    var f = Function('n', 'return ' + expr);
    var end = i + (argv.n || (i + 10 - 1));
    for (; i < end; i++) console.log(f(i));
    return;
}

var sequence = argv._.map(function (n) { return parseInt(n, 10) });;

var f = solver(sequence);

if (argv.c || argv.continue) {
    var i = sequence.length + 1;
    var end = i + (argv.n || (i + 10 - 1));
    for (; i < end; i++) {
        console.log(f(i));
    }
}
else {
    console.log(pretty(f));
}

function pretty (f) {
    return (f+'').replace(/\n/g,'')
        .replace(/^function anonymous\(n\) {return /, '')
        .replace(/}$/, '')
    ;
}
