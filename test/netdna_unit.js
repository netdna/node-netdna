//     node-netdna
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

  '_makeUrl': {
      'returns url': function () {
          assert.equal(netdna._makeUrl('foobar'), 'https://rws.netdna.com/foobar/foobar');
      }
  },

  '_parse': {
    topic: function() {
      netdna._parse(this.callback)(null, JSON.stringify({ foo: 'bar' }), null);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
      assert.equal(response.foo, 'bar');
    }
  },

  'get': {
    topic: function() {
      netdna.get('account.json', this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  },

  'get with param': {
    topic: function() {
      netdna.get('account.json/address', this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  },

  'put': {
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

  'put with param': {
    topic: function() {
      netdna.put('account.json/address', {
        street1: time
      }, this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
      assert.isDefined(response.data);
    }
  },

  'post': {
    topic: function() {
      netdna.post('zones/pull.json', {
          name: 'Testing-Local'
        , url: 'http://test.com'
      }, this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  },

  'delete one': {
      topic: function() {
          netdna.delete('/foobar', this.callback);
      }, 'returns single response': function(err, response) {
          assert.isNull(err);
          assert.isDefined(response);
          assert.isDefined(response.data);
      }
  },

  'delete multiple': {
      topic: function() {
          var urls = [ 'foo1', 'foo2', 'foo3' ];
          netdna.delete(urls, this.callback);
      }, 'returns multiple response': function(err, response) {
          assert.isNull(err);
          assert.isDefined(response);
          assert.isDefined(response.foo1);
          assert.isDefined(response.foo2);
          assert.isDefined(response.foo3);
          assert.equal(Object.keys(response).length, 3);
      }
  },

}).export(module, { error: false });
