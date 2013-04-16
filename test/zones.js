
//     node-netdna
//     Copyright (c) 2013- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

var vows   = require('vows')
  , assert = require('assert')

var netdna = require('../netdna')({
    companyAlias: process.env.ALIAS
  , consumerKey: process.env.KEY
  , consumerSecret: process.env.SECRET
})

vows.describe('pull').addBatch({

  'get pull': {
    topic: function() {
      netdna.get('zones/pull.json', this.callback)
    }, 'returns response': function(err, response) {
      assert.isNull(err)
      assert.isDefined(response)
      assert.isDefined(response.data)
      assert.isDefined(response.data.pullzones)
    }
  }

}).export(module, { error: false })
