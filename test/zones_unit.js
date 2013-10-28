
//     node-netdna
//     Copyright (c) 2013- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

var vows   = require('vows');
var assert = require('assert');

require('./stubs');

var netdna = require('../netdna')({
    companyAlias: 'foobar'
  , consumerKey: 'foobar'
  , consumerSecret: 'foobar'
});

vows.describe('pull').addBatch({

  'get pull': {
    topic: function() {
      netdna.get('zones/pull.json', this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
      assert.isDefined(response.data);
    }
  },

  'post pull': {
    topic: function() {
      netdna.post('zones/pull.json', {
          name: 'Testing-Local'
        , url: 'http://test.com'
      }, this.callback);
    }, 'returns response': function(err, response) {
      assert.isNull(err);
      assert.isDefined(response);
    }
  }

}).export(module, { error: false });
