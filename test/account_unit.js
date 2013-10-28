
//     node-netdna
//     Copyright (c) 2013- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

var vows   = require('vows');
var assert = require('assert');
var time   = new Date().getTime();

require('./stubs');

var netdna = require('../netdna')({
    companyAlias: 'foobar'
  , consumerKey: 'foobar'
  , consumerSecret: 'foobar'
});

vows.describe('account').addBatch({

  'get account info': {
    topic: function() {
      netdna.get('account.json', this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  },

  'update account info': {
    topic: function() {
      netdna.put('account.json', {
        name: time
      }, this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
      assert.isDefined(response.data);
    }
  },

  'get account address': {
    topic: function() {
      netdna.get('account.json/address', this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  },

  'update account address': {
    topic: function() {
      netdna.put('account.json/address', {
        street1: time
      }, this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
      assert.isDefined(response.data);
    }
  }

}).export(module, { error: false });
