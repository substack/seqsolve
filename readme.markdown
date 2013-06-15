# seqsolve

generate an algebraic formula for a sequence

# example

## command-line

```
$ seqsolve 11 44 99 176 275 396 539
((n*(11))*(n))
```

```
$ seqsolve -n 20 -e '((n*(11))*(n))'
11
44
99
176
275
396
539
704
891
1100
1331
1584
1859
2156
2475
2816
3179
3564
3971
4400
```

```
$ seqsolve -c 11 15 20 26 33
53
69
88
109
133
159
188
219
253
289
328
369
413
459
508
```

## api

``` js
var solve = require('seqsolve');
var f = solve([ 2, 4, 8, 16, 32 ]);
var xs = [ 10, 11, 12 ].map(f);
console.dir(xs);
```

Generate an algebraic expression of an index variable `n` starting at `1` given
a sequence.

# methods

``` js
var seqsolve = require('seqsolve')
```

## var f = seqsolve(xs)

Generate a function `f(n)` to compute digits for each index `n` starting from
`1`.

## var terms = seqsolve.solve(xs)

Generate a serializable array representing the algebraic data structure of the
underlying computation. There is an implied leading `n` term.

Example:

```
$ node -pe "require('seqsolve').solve([3,6,11,18,27,38])"
[ [ '*', 'n' ], [ '+', 2 ] ]
```

## var f = seqsolve.eval(terms)

Compile the `terms` from `seqsolve.solve()` into a function `f`.

Example:

```
$ node -pe "require('seqsolve').eval([ [ '*', 'n' ], [ '+', 2 ] ]).toString()"
function anonymous(n) {
return ((n*(n))+(2))
}
```

# install

With [npm](https://npmjs.org) do:

```
npm install seqsolve
```

# todo

* [Lagrange Polynomials](http://en.wikipedia.org/wiki/Lagrange_polynomial)

# license

MIT