// node-netdna
// MIT Licensed

var netdna = require('netdna')({
      companyAlias: 'alias'
    , consumerKey: 'key'
    , consumerSecret: 'secret'
});

// get account info
netdna.get('account.json', callback);

function callback(err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
}
