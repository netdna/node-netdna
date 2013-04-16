
//     node-netdna
//     Copyright (c) 2013- Nick Baugh <niftylettuce@gmail.com> (http://niftylettuce.com)
//     MIT Licensed

var path        = require('path')
  , request     = require('request')
  , qs          = require('qs')
  , OAuth       = require('oauth').OAuth
  , version     = require('./package').version

module.exports = function(opts) {
  if (typeof opts.companyAlias !== 'string')
    throw new Error('company alias missing or not a string')
  if (typeof opts.consumerKey !== 'string')
    throw new Error('consumer key missing or not a string')
  if (typeof opts.consumerSecret !== 'string')
    throw new Error('consumer secret missing or not a string')
  return new NetDNA(opts)
}

function NetDNA(opts) {
  var that = this
  that.companyAlias = opts.companyAlias
  that.consumerKey = opts.consumerKey
  that.consumerSecret = opts.consumerSecret
  that.API_SERVER = 'https://rws.netdna.com'
  that.oa = new OAuth(
      that.API_SERVER + '/oauth/request_token'
    , that.API_SERVER + '/oauth/access_token'
    , that.consumerKey
    , that.consumerSecret
    , '1.0'
    , (opts.callback) ? opts.callback : 'oob'
    , 'HMAC-SHA1'
  )
}

NetDNA.prototype._makeUrl = function _makeUrl(url) {
  return this.API_SERVER + '/' + this.companyAlias + '/' + url
}

NetDNA.prototype.get = function get(url, callback) {
  this.oa.get(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , this._parse(callback)
  )
}

NetDNA.prototype.delete = function del(url, callback) {
  this.oa.delete(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , this._parse(callback)
  )
}

NetDNA.prototype.post = function post(url, body, contentType, callback) {
  if (typeof contentType === 'function') {
    callback = contentType
    contentType = null
  }
  this.oa.post(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , qs.stringify(body)
    , contentType
    , this._parse(callback)
  )
}

NetDNA.prototype.put = function put(url, body, contentType, callback) {
  if (typeof contentType === 'function') {
    callback = contentType
    contentType = null
  }
  this.oa.put(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , qs.stringify(body)
    , contentType
    , this._parse(callback)
  )
}

/*
// used for 3-legged oauth in combination with opts.callback
that.oa.getOAuthRequestToken(function(err, token, secret, results) {
  if (err) return callback(err)
})
*/

NetDNA.prototype._parse = function _parse(callback) {
  return function(err, data, response) {
    try {
      data = JSON.parse(data)
    } catch(e) {
      err = {
          statusCode: 500
        , data: "Invalid JSON from NetDNA's API."
      }
    }
    callback(err, data)
  }
}
