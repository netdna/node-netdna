//     node-netdna
//     MIT Licensed

var vows   = require('vows');
var assert = require('assert');
var time   = new Date().getTime();

var netdna = require('../netdna')({
    companyAlias: process.env.ALIAS,
    consumerKey: process.env.KEY,
    consumerSecret: process.env.SECRET
});

vows.describe('account').addBatch({

    'get account info': {
        topic: function() {
            netdna.get('account.json', this.callback);
        },
        'returns response': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
        }
    },

    'update account info': {
        topic: function() {
            netdna.put('account.json', {
                name: time
            }, this.callback);
        },
        'returns response': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.data.account.name, time);
        }
    },

    'get account address': {
        topic: function() {
            netdna.get('account.json/address', this.callback);
        },
        'returns response': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
        }
    },

    'update account address': {
        topic: function() {
            netdna.put('account.json/address', {
                street1: time
            }, this.callback);
        },
        'returns response': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.data.address.street1, time);
        }
    }

}).export(module, { error: false });
