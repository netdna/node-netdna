/***
 * Stub OAuth
 ***/
var OAuth = require('oauth').OAuth;
[ 'get', 'delete', 'put', 'post' ].forEach(function(fn) {
    OAuth.prototype[fn] = function() {
        arguments[arguments.length-1](null, JSON.stringify({ data: 'foobar' }));
    };
});

